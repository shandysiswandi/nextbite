import { NextResponse } from "next/server";

import { apiPost } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import { verifyCsrfToken } from "@/libraries/security/csrf";
import { catchError } from "@/libraries/utils/error";

interface RequestBody {
  challenge_token: string;
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

  try {
    await apiPost<RequestBody, void>(
      API_PATH.identity.registerVerify,
      { challenge_token: body.token },
      {
        needAccessToken: false,
        needAutoRefreshToken: false,
      }
    );

    return NextResponse.json({});
  } catch (error: unknown) {
    return catchError(error);
  }
}
