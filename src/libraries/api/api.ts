import "server-only";

import { type AxiosRequestConfig, isAxiosError, type Method } from "axios";

import { instanceAxios } from "./axios";
import { ApiError } from "./exceptions";
import type { ApiEnvelope, ApiErrorResponse, QueryValue } from "./types";

interface ApiRequestOptions<Body = unknown> {
  method: Method;
  path: string;
  body?: Body;
  query?: Record<string, QueryValue>;
  config?: AxiosRequestConfig;
  needAccessToken?: boolean; // Default: true. If false, no token attached.
  needAutoRefreshToken?: boolean; // Default: true. If false, 401s fail immediately.
}

// Extend Axios Config to satisfy TypeScript
// We tell TS that our config allows these custom properties
declare module "axios" {
  export interface AxiosRequestConfig {
    needAccessToken?: boolean;
    needAutoRefreshToken?: boolean;
  }
}

async function request<Req = unknown, Resp = unknown>(
  options: ApiRequestOptions<Req>
): Promise<ApiEnvelope<Resp>> {
  const {
    method,
    path,
    body,
    query,
    config,
    needAccessToken = true,
    needAutoRefreshToken = true,
  } = options;

  try {
    const response = await instanceAxios.request<ApiEnvelope<Resp>>({
      method,
      url: path,
      data: body,
      params: query,

      // Pass flags to Axios Config so Interceptors can see them
      needAccessToken,
      needAutoRefreshToken,

      ...config,
    });

    if (response.status === 204) {
      return {
        message: "Operation successful",
        data: null as unknown as Resp, // safely cast null to void/Resp
      };
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const apiError = error.response.data as ApiErrorResponse;

      throw new ApiError(
        apiError?.message || error.message || "An unexpected error occurred",
        error.response.status,
        apiError?.error // Pass validation field errors if they exist
      );
    }

    throw new ApiError("Network Error: Please check your connection", 503);
  }
}

export const apiGet = <Resp>(
  path: string,
  options?: Omit<ApiRequestOptions<undefined>, "method" | "path" | "body">
) => request<undefined, Resp>({ method: "GET", path, ...options });

export const apiPost = <Req, Resp>(
  path: string,
  body: Req,
  options?: Omit<ApiRequestOptions<Req>, "method" | "path" | "body">
) => request<Req, Resp>({ method: "POST", path, body, ...options });

export const apiPut = <Req, Resp>(
  path: string,
  body: Req,
  options?: Omit<ApiRequestOptions<Req>, "method" | "path" | "body">
) => request<Req, Resp>({ method: "PUT", path, body, ...options });

export const apiPatch = <Req, Resp>(
  path: string,
  body: Req,
  options?: Omit<ApiRequestOptions<Req>, "method" | "path" | "body">
) => request<Req, Resp>({ method: "PATCH", path, body, ...options });

export const apiDelete = <Resp>(
  path: string,
  options?: Omit<ApiRequestOptions<undefined>, "method" | "path" | "body">
) => request<undefined, Resp>({ method: "DELETE", path, ...options });
