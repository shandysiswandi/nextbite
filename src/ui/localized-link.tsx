"use client";

import Link, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import { i18n } from "@/libraries/i18n/types";

type LocalizedLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export function LocalizedLink({
  href,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const lang = (params?.lang as string) || i18n.defaultLocale;
  let path = href;

  if (href.startsWith("/") && !href.startsWith("http")) {
    // Check if the path implies a specific language change (optional safety)
    // or simply prepend the current lang
    path = `/${lang}${href}`;
  }

  return (
    <Link href={path} {...props}>
      {children}
    </Link>
  );
}
