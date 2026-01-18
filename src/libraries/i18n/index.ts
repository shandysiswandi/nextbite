import "server-only";

import { cookies } from "next/headers";
import { COOKIE } from "@/libraries/constants/cookie";
import type { Locale } from "./types";

const dictionaries = {
  en: () => import("./locales/en.json").then((module) => module.default),
  id: () => import("./locales/id.json").then((module) => module.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => {
  // If the requested locale doesn't exist, fallback to English
  return (await dictionaries[locale]?.()) ?? dictionaries.en();
};

export const useServerI18n = async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE.language)?.value ?? "en";
  return await getDictionary(cookieLocale as Locale);
};
