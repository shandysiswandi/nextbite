import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiPost } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import { COOKIE } from "@/libraries/constants/cookie";
import { verifyCsrfToken } from "@/libraries/security/csrf";
import { catchError } from "@/libraries/utils/error";

interface RequestBody {
  refresh_token: string;
}

export async function POST(request: Request) {
  const csrfValid = await verifyCsrfToken(request);
  if (!csrfValid) {
    return NextResponse.json(
      { message: "Invalid CSRF token" },
      { status: 403 }
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE.refreshToken)?.value ?? "__TOKEN__";

  try {
    await apiPost<RequestBody, void>(
      API_PATH.identity.logout,
      { refresh_token: token },
      {
        needAccessToken: true,
        needAutoRefreshToken: false,
      }
    );

    const response = NextResponse.json({});
    response.cookies.delete(COOKIE.accessToken);
    response.cookies.delete(COOKIE.refreshToken);
    return response;
  } catch (error: unknown) {
    const response = catchError(error);
    response.cookies.delete(COOKIE.accessToken);
    response.cookies.delete(COOKIE.refreshToken);
    return response;
  }
}
