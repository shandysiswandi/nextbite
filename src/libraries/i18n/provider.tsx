"use client";

import { createContext, type ReactNode, useContext } from "react";
import type en from "./locales/en.json";

type Dictionary = typeof en;

const I18nContext = createContext<Dictionary | null>(null);

export function I18nProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider value={dictionary}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const dict = useContext(I18nContext);
  if (dict === null) {
    throw new Error("useI18n must be used within a I18nProvider");
  }
  return dict;
}
