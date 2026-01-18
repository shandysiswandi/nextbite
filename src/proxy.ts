import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";

import { COOKIE } from "@/libraries/constants/cookie";
import { ROUTE } from "@/libraries/constants/route";
import { i18n, type Locale } from "@/libraries/i18n/types";

const LOCALE_COOKIE_MAX_AGE = 31_536_000;

function getLocale(request: NextRequest): string {
  const cookieLang = request.cookies.get(COOKIE.language)?.value;
  if (cookieLang && i18n.locales.includes(cookieLang as Locale)) {
    return cookieLang;
  }

  const negotiatorHeaders: Record<string, string> = {};
  for (const [key, value] of request.headers.entries()) {
    negotiatorHeaders[key] = value;
  }

  const locales = [...i18n.locales];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return matchLocale(languages, locales, i18n.defaultLocale);
}

function normalizePath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && firstSegment.length === 2) {
    return `/${segments.slice(1).join("/")}`;
  }
  return pathname;
}

function syncLocaleCookie(
  request: NextRequest,
  response: NextResponse,
  locale: string
) {
  const existingLocale = request.cookies.get(COOKIE.language)?.value;
  if (existingLocale !== locale) {
    response.cookies.set(COOKIE.language, locale, {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
}

function ensureCsrfToken(request: NextRequest, response: NextResponse) {
  const existingToken = request.cookies.get(COOKIE.csrfToken)?.value;
  if (!existingToken) {
    const csrfToken = crypto.randomUUID();
    response.cookies.set(COOKIE.csrfToken, csrfToken, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if missing locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const normalizedPath = normalizePath(pathname);
    const redirectPath = normalizedPath.startsWith("/")
      ? normalizedPath
      : `/${normalizedPath}`;
    const response = NextResponse.redirect(
      new URL(`/${locale}${redirectPath}`, request.url)
    );
    syncLocaleCookie(request, response, locale);
    return response;
  }

  // Get current locale from URL (e.g. "en" from "/en/console")
  // We know it exists because we passed step 1
  const currentLocale = pathname.split("/")[1];
  const response = NextResponse.next();
  syncLocaleCookie(request, response, currentLocale);

  // We only run this on GET/HEAD (per your original code)
  if (request.method !== "GET" && request.method !== "HEAD") {
    return response;
  }

  // Check Auth for Console Routes
  // Note: Path is now "/en/console", so we check startsWith(`/${currentLocale}/console`)
  const accessToken = request.cookies.get(COOKIE.accessToken)?.value;
  const isConsoleRouteMatch = pathname.startsWith(
    `/${currentLocale}${ROUTE.console.root}`
  );
  if (!accessToken && isConsoleRouteMatch) {
    // Redirect to localized login: /en/login
    const loginUrl = new URL(
      `/${currentLocale}${ROUTE.auth.login}`,
      request.url
    );

    // Append return URL
    loginUrl.searchParams.set("from", `${pathname}${request.nextUrl.search}`);

    return NextResponse.redirect(loginUrl);
  }

  // Set CSRF Token if missing
  ensureCsrfToken(request, response);

  return response;
}

export const config = {
  // Matcher ignores _next, api, favicon, and static assets
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|startup-launch.svg|android-chrome-192x192.png).*)",
  ],
};
