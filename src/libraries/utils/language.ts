"use server";

import { cookies } from "next/headers";
import { COOKIE } from "@/libraries/constants/cookie";

export async function setLanguageCookie(locale: string) {
  // In Next.js 15+, cookies() is an async function
  const cookieStore = await cookies();

  cookieStore.set(COOKIE.language, locale, {
    path: "/",
    maxAge: 31_536_000, // 1 year
    sameSite: "lax",
  });
}
