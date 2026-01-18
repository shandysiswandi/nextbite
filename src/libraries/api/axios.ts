import "server-only";

import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { cookies } from "next/headers";

import { API_PATH } from "@/libraries/constants/api";
import { COOKIE } from "@/libraries/constants/cookie";

import type { ApiEnvelope } from "./types";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

const apiUrl = process.env.API_URL;
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !apiUrl) {
  throw new Error("API_URL is required in production");
}

if (isProduction && apiUrl?.startsWith("http://")) {
  throw new Error("API_URL must use https in production");
}

const API_URL = apiUrl ?? "http://localhost:8080";
const API_PROXY_ENABLED = process.env.API_PROXY_ENABLE !== "false";

export const instanceAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "NextBite/v1.0.0 Build (01-01-2026)",
  },
  proxy: API_PROXY_ENABLED ? undefined : false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// biome-ignore lint/suspicious/noExplicitAny: it's oke for now
const refreshAuthLogic = async (failedRequest: any) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(COOKIE.refreshToken)?.value;

  if (!refreshToken) {
    return Promise.reject();
  }

  try {
    const response = await axios.post<ApiEnvelope<AuthResponse>>(
      `${API_URL}${API_PATH.identity.refresh}`,
      { refresh_token: refreshToken },
      {
        headers: { "Content-Type": "application/json" },
        proxy: API_PROXY_ENABLED ? undefined : false,
      }
    );

    const { access_token: accessToken, refresh_token: newRefreshToken } =
      response.data.data;

    cookieStore.set(COOKIE.accessToken, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set(COOKIE.refreshToken, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(instanceAxios, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
  shouldRefresh: (error) => {
    // If the request specifically asked to auto refresh, proceed with refresh logic
    if (error.config?.needAutoRefreshToken) {
      return true;
    }
    return false; // Otherwise, 401s fail immediately
  },
});

instanceAxios.interceptors.request.use(async (config) => {
  if (config.needAccessToken === false) {
    return config; // Skip attaching token
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE.accessToken)?.value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
