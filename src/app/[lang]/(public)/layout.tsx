import { Command } from "lucide-react";

import { APP } from "@/libraries/constants/app";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex flex-col px-4 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
        {children}

        <footer className="border-border border-t bg-background">
          <div className="flex flex-col items-center justify-center gap-6 py-10 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 font-semibold text-sm">
              <span className="hidden size-8 items-center justify-center rounded-full bg-primary text-primary-foreground sm:flex">
                <Command className="size-5" />
              </span>
              <p>
                © {new Date().getFullYear()} {APP.name}. All rights reserved.
              </p>
            </div>

            <p className="text-muted-foreground text-xs">
              Build calmer launches with {APP.name}.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
