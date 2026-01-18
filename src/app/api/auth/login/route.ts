import { NextResponse } from "next/server";

import { loginSchema } from "@/features/auth/model/login";
import { apiPost } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import { COOKIE } from "@/libraries/constants/cookie";
import { verifyCsrfToken } from "@/libraries/security/csrf";
import { catchError } from "@/libraries/utils/error";

interface Response {
  access_token?: string;
  refresh_token?: string;
  mfa_required?: boolean;
  challenge_token?: string;
  available_methods?: string[];
}

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const csrfValid = await verifyCsrfToken(request);
  if (!csrfValid) {
    return NextResponse.json(
      { message: "Invalid CSRF token" },
      { status: 403 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const response = await apiPost<RequestBody, Response>(
      API_PATH.identity.login,
      parsed.data,
      {
        needAccessToken: false,
        needAutoRefreshToken: false,
      }
    );

    const { data } = response;

    if (data.mfa_required) {
      const res = NextResponse.json({
        mfaRequired: data.mfa_required,
        challengeToken: data.challenge_token,
        availableMethods: data.available_methods,
      });

      if (data.challenge_token) {
        res.cookies.set(COOKIE.mfaChallengeToken, data.challenge_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }

      return res;
    }

    const res = NextResponse.json({});

    if (data.access_token) {
      res.cookies.set(COOKIE.accessToken, data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    if (data.refresh_token) {
      res.cookies.set(COOKIE.refreshToken, data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return res;
  } catch (error: unknown) {
    return catchError(error);
  }
}
