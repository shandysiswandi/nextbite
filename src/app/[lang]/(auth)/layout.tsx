import { Command } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { APP } from "@/libraries/constants/app";
import { ROUTE } from "@/libraries/constants/route";
import { LocalizedLink } from "@/ui/localized-link";

export const metadata: Metadata = {
  title: {
    default: "Authentication",
    template: "%s | Next Bite Authentication",
  },
  description: "The official description for my website.",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2">
          <LocalizedLink
            className="flex items-center gap-2 font-medium"
            href={ROUTE.public.home}
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Command className="size-4" />
            </div>
            {APP.name} Inc.
          </LocalizedLink>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>

      <div className="relative hidden bg-background lg:block">
        <Image
          alt="startup launch svg"
          className="object-contain"
          fill
          priority
          src="/startup-launch.svg"
        />
      </div>
    </div>
  );
}
