import { NextResponse } from "next/server";

import { registerSchema } from "@/features/auth/model/register";
import { apiPost } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import { verifyCsrfToken } from "@/libraries/security/csrf";
import { catchError } from "@/libraries/utils/error";

interface RequestBody {
  captcha: string;
  full_name: string;
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
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const response = await apiPost<RequestBody, void>(
      API_PATH.identity.register,
      {
        captcha: parsed.data.captchaToken,
        full_name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
      },
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
