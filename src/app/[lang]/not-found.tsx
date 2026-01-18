import {
  ArrowUpRight,
  Compass,
  LogIn,
  type LucideIcon,
  UserPlus,
} from "lucide-react";
import { ROUTE } from "@/libraries/constants/route";
import { useServerI18n } from "@/libraries/i18n";
import { Badge } from "@/ui/base/badge";
import { Button } from "@/ui/base/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/base/card";
import { LocalizedLink } from "@/ui/localized-link";

const quickLinks: Array<{
  key: "home" | "signIn" | "register";
  href: string;
  icon: LucideIcon;
}> = [
  {
    key: "home",
    href: ROUTE.public.home,
    icon: Compass,
  },
  {
    key: "signIn",
    href: ROUTE.auth.login,
    icon: LogIn,
  },
  {
    key: "register",
    href: ROUTE.auth.register,
    icon: UserPlus,
  },
];

export default async function NotFound() {
  const dictionary = await useServerI18n();

  return (
    <div className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-15 blur-3xl" />
        <div className="absolute top-24 left-[-14%] h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)] opacity-30 blur-3xl" />
        <div className="absolute right-[6%] bottom-[-20%] h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--secondary)_0%,transparent_70%)] opacity-40 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(0,0,0,0.03)_50%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col gap-12 px-6 py-16 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <Badge
            className="px-2 text-xs uppercase tracking-widest"
            variant="outline"
          >
            <span className="size-2 rounded-full bg-primary" />
            {dictionary.notFound.badge}
          </Badge>

          <div className="space-y-4">
            <p className="bg-[linear-gradient(120deg,var(--foreground)_0%,var(--muted-foreground)_100%)] bg-clip-text font-semibold text-6xl text-transparent leading-none md:text-7xl">
              404
            </p>
            <h1 className="font-semibold text-2xl tracking-tight md:text-4xl">
              {dictionary.notFound.title}
            </h1>
            <p className="max-w-md text-base text-muted-foreground md:text-lg">
              {dictionary.notFound.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <LocalizedLink href={ROUTE.public.home}>
                {dictionary.notFound.primaryAction}
              </LocalizedLink>
            </Button>
            <Button asChild variant="outline">
              <LocalizedLink href={ROUTE.auth.login}>
                {dictionary.notFound.secondaryAction}
              </LocalizedLink>
            </Button>
          </div>
        </div>

        <Card className="fade-in-0 slide-in-from-bottom-6 animate-in duration-700">
          <CardHeader>
            <CardTitle className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
              {dictionary.notFound.quickPathsLabel}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickLinks.map(({ key, href: to, icon: Icon }) => (
              <LocalizedLink
                className="group flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 transition hover:border-border hover:bg-accent/40"
                href={to}
                key={key}
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Icon className="size-5" />
                </span>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">
                    {dictionary.notFound.quickLinks[key].title}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {dictionary.notFound.quickLinks[key].description}
                  </p>
                </div>
                <span className="mt-1 flex size-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition group-hover:border-border group-hover:text-foreground">
                  <ArrowUpRight className="size-4" />
                </span>
              </LocalizedLink>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
