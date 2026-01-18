import "server-only";

import { cookies } from "next/headers";

import { COOKIE } from "@/libraries/constants/cookie";
import { SECURITY } from "@/libraries/constants/security";

export async function verifyCsrfToken(request: Request) {
  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(COOKIE.csrfToken)?.value;
  const csrfHeader = request.headers.get(SECURITY.csrfHeader);

  if (!(csrfCookie && csrfHeader)) {
    return false;
  }

  return csrfCookie === csrfHeader;
}
