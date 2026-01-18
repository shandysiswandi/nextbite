import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useServerI18n } from "@/libraries/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await useServerI18n();
  return {
    title: dict.console.notFound.badge,
    description: dict.console.notFound.description,
  };
}

export default function Page() {
  notFound();
}
