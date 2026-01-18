import { NextResponse } from "next/server";

import { forgotSchema } from "@/features/auth/model/password";
import { apiPost } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import { verifyCsrfToken } from "@/libraries/security/csrf";
import { catchError } from "@/libraries/utils/error";

interface RequestBody {
  captcha: string;
  email: string;
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
  const parsed = forgotSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const response = await apiPost<RequestBody, void>(
      API_PATH.identity.password.forgot,
      { captcha: parsed.data.captchaToken, email: parsed.data.email },
      {
        needAccessToken: false,
        needAutoRefreshToken: false,
      }
    );
    return NextResponse.json(response);
  } catch (error: unknown) {
    return catchError(error);
  }
}
