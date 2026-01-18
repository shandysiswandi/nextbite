"use client";

import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocalizedRouter } from "@/libraries/hooks/use-localized-router";
import { useI18n } from "@/libraries/i18n/provider";
import { setLanguageCookie } from "@/libraries/utils/language";
import { Button } from "@/ui/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/base/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/base/tooltip";

const languages = [
  { value: "en", label: "English", short: "EN" },
  { value: "id", label: "Bahasa Indonesia", short: "ID" },
];

export function NavLanguage() {
  const dict = useI18n();
  const pathName = usePathname();
  const router = useLocalizedRouter();

  const currentLangCode = pathName?.split("/")[1] || "en";
  const activeLanguage =
    languages.find((l) => l.value === currentLangCode) || languages[0];

  const switchLang = async (newLang: string) => {
    if (!pathName) {
      return;
    }
    const segments = pathName.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");
    await setLanguageCookie(newLang);
    router.push(newPath);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="hidden h-8 rounded-full px-2 lg:inline-flex"
              size="sm"
              variant="ghost"
            >
              <Globe className="size-4" />
              <span className="font-semibold text-xs tracking-wide">
                {activeLanguage.short}
              </span>
              <span className="sr-only">{dict.console.language.switch}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{dict.console.language.switch}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel>{dict.console.language.label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          onValueChange={switchLang}
          value={activeLanguage.value}
        >
          {languages.map((option) => (
            <DropdownMenuRadioItem
              className="justify-between"
              key={option.value}
              value={option.value}
            >
              <span>{option.label}</span>
              <span className="ml-auto text-muted-foreground text-xs">
                {option.short}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
