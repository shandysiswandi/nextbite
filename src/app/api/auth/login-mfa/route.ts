import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  MFA_TO_VALUE,
  twoFactorSchema,
} from "@/features/auth/model/two-factor";
import { apiPost } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import { COOKIE } from "@/libraries/constants/cookie";
import { verifyCsrfToken } from "@/libraries/security/csrf";
import { catchError } from "@/libraries/utils/error";

interface Response {
  access_token: string;
  refresh_token?: string;
}

interface RequestBody {
  challenge_token: string;
  method: string;
  code: string;
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
  const parsed = twoFactorSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const challengeToken = cookieStore.get(COOKIE.mfaChallengeToken)?.value;
  if (!challengeToken) {
    return NextResponse.json(
      { message: "Missing challenge token" },
      { status: 400 }
    );
  }

  try {
    const response = await apiPost<RequestBody, Response>(
      API_PATH.identity.loginMfa,
      {
        challenge_token: challengeToken,
        method: MFA_TO_VALUE[parsed.data.method],
        code: parsed.data.code,
      },
      {
        needAccessToken: false,
        needAutoRefreshToken: false,
      }
    );

    const res = NextResponse.json({});
    res.cookies.set(COOKIE.accessToken, response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    if (response.data.refresh_token) {
      res.cookies.set(COOKIE.refreshToken, response.data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    res.cookies.set(COOKIE.mfaChallengeToken, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error: unknown) {
    return catchError(error);
  }
}
