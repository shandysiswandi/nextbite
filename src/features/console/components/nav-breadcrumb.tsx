"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { ROUTE } from "@/libraries/constants/route";
import { useI18n } from "@/libraries/i18n/provider";
import { i18n, type Locale } from "@/libraries/i18n/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/base/breadcrumb";
import { LocalizedLink } from "@/ui/localized-link";

const ROUTE_LABELS: Record<string, string> = {
  feature1: "Feature 1",
  feature2: "Feature 2",
  page1: "Page 1",
  page2: "Page 2",
  me: "User",
};

const CONSOLE_ROUTES = new Set<string>(collectRoutes(ROUTE.console));

function collectRoutes(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectRoutes);
  }

  return [];
}

export function NavBreadcrumb() {
  const dictionary = useI18n();
  const pathname = usePathname();

  const allSegments = pathname.split("/").filter((item) => item !== "");
  const isLocale = i18n.locales.includes(allSegments[0] as Locale);
  const segments = isLocale ? allSegments.slice(1) : allSegments;

  const isConsoleRoute = segments[0] === "console";
  const pathWithoutLocale = `/${segments.join("/")}`;
  const isKnownConsoleRoute =
    isConsoleRoute && CONSOLE_ROUTES.has(pathWithoutLocale);
  const hasUnknownSegment = isConsoleRoute && !isKnownConsoleRoute;

  if (hasUnknownSegment) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <LocalizedLink href={ROUTE.console.dashboard}>
                {dictionary.console.breadcrumb.console}
              </LocalizedLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>
              {dictionary.console.breadcrumb.notFound}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const pathSection = segments.slice(0, index + 1).join("/");

          const title =
            ROUTE_LABELS[segment] ||
            segment.charAt(0).toUpperCase() +
              segment.slice(1).replace(/-/g, " ");

          return (
            <Fragment key={pathSection}>
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <LocalizedLink href={pathSection}>{title}</LocalizedLink>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
