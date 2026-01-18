"use client";

import { useRouter as useNextRouter, useParams } from "next/navigation";
import { i18n } from "@/libraries/i18n/types";

export function useLocalizedRouter() {
  const router = useNextRouter();
  const params = useParams();

  const lang = (params?.lang as string) || i18n.defaultLocale;

  const localize = (href: string) => {
    if (href.startsWith("http") || href.startsWith(`/${lang}`)) {
      return href;
    }
    if (i18n.locales.find((locale) => href.startsWith(`/${locale}`))) {
      return href;
    }
    const path = href.startsWith("/") ? href : `/${href}`;
    return `/${lang}${path}`;
  };

  return {
    ...router,
    push: (href: string) => router.push(localize(href)),
  };
}
