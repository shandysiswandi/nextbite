"use client";

import { ROUTE } from "@/libraries/constants/route";
import { useI18n } from "@/libraries/i18n/provider";
import { Badge } from "@/ui/base/badge";
import { Button } from "@/ui/base/button";
import { LocalizedLink } from "@/ui/localized-link";

export default function NotFound() {
  const dictionary = useI18n();

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
      <Badge
        className="px-2 text-xs uppercase tracking-widest"
        variant="secondary"
      >
        {dictionary.console.notFound.badge}
      </Badge>
      <h3 className="font-semibold text-3xl">
        {dictionary.console.notFound.title}
      </h3>
      <p className="mb-6 max-w-sm text-muted-foreground">
        {dictionary.console.notFound.description}
      </p>
      <Button asChild className="rounded-lg text-base">
        <LocalizedLink href={ROUTE.console.dashboard}>
          {dictionary.console.notFound.action}
        </LocalizedLink>
      </Button>
    </div>
  );
}
