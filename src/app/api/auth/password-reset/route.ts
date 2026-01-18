import { NextResponse } from "next/server";

import { resetSchema } from "@/features/auth/model/password";
import { apiPost } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import { verifyCsrfToken } from "@/libraries/security/csrf";
import { catchError } from "@/libraries/utils/error";

interface RequestBody {
  token: string;
  newPassword: string;
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
  const parsed = resetSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const token = typeof body?.token === "string" ? body.token : "";
  if (token.length !== 64) {
    return NextResponse.json(
      { message: "Invalid reset token" },
      { status: 400 }
    );
  }

  try {
    const response = await apiPost<RequestBody, void>(
      API_PATH.identity.password.reset,
      {
        token,
        newPassword: parsed.data.newPassword,
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
