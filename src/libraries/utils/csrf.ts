import { COOKIE } from "@/libraries/constants/cookie";

export function getCsrfToken(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const pattern = new RegExp(`(?:^|; )${COOKIE.csrfToken}=([^;]*)`);
  const match = document.cookie.match(pattern);

  return match ? decodeURIComponent(match[1]) : null;
}
