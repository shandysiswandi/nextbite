import {
  ArrowRight,
  Bell,
  type LucideIcon,
  Mail,
  MessageSquare,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { APP } from "@/libraries/constants/app";
import { ROUTE } from "@/libraries/constants/route";
import { Badge } from "@/ui/base/badge";
import { Button } from "@/ui/base/button";
import { Input } from "@/ui/base/input";
import { Textarea } from "@/ui/base/textarea";
import { LocalizedLink } from "@/ui/localized-link";

const features: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  delay: string;
}> = [
  {
    title: "Signal routing",
    description:
      "Triage feedback into owned lanes with guardrails that keep work moving.",
    icon: Bell,
    delay: "delay-0",
  },
  {
    title: "Live playbooks",
    description:
      "Store rituals, checklists, and release beats in one calm workspace.",
    icon: SlidersHorizontal,
    delay: "delay-150",
  },
  {
    title: "Compliance ready",
    description:
      "Keep approvals, artifacts, and audit trails attached to every decision.",
    icon: ShieldCheck,
    delay: "delay-300",
  },
  {
    title: "Customer pulse",
    description:
      "Collect quotes, notes, and sentiment so priorities feel obvious.",
    icon: MessageSquare,
    delay: "delay-500",
  },
];

const contactOptions: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "General",
    description: "hello@biteui.co",
    icon: Mail,
  },
  {
    title: "Partnerships",
    description: "partners@biteui.co",
    icon: Bell,
  },
  {
    title: "Support",
    description: "support@biteui.co",
    icon: MessageSquare,
  },
];

export default function Page() {
  return (
    <main>
      <section className="pt-12 pb-14" id="hero">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-6">
            <Badge
              className="gap-2 text-[0.65rem] uppercase tracking-[0.35em]"
              variant="outline"
            >
              <span className="size-2 rounded-full bg-primary" />
              Public beta
            </Badge>
            <h1 className="font-semibold text-4xl leading-tight tracking-tight md:text-6xl">
              Modern product rituals for teams that move fast and learn every
              release
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
              {APP.name} helps modern teams plan, ship, and learn from every
              release with a studio-first workflow and signal rich insights that
              keep priorities obvious.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <LocalizedLink href={ROUTE.auth.login}>
                  Get Started
                </LocalizedLink>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                Weekly rituals that stick
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                Built for cross functional teams
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" id="features">
        <div className="flex flex-col gap-3">
          <span className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
            Features
          </span>
          <h2 className="font-semibold text-3xl md:text-4xl">
            A studio stack for modern product teams.
          </h2>
          <p className="text-base text-muted-foreground">
            Align planning, delivery, and learning with tools that make clarity
            feel effortless.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                className={`group fade-in-0 slide-in-from-bottom-4 animate-in duration-700 ${feature.delay} rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
                key={feature.title}
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16" id="contact">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-[0.35em]">
                Contact
              </span>
              <h2 className="mt-3 font-semibold text-3xl md:text-4xl">
                Let us shape your next release ritual.
              </h2>
            </div>
            <p className="text-base text-muted-foreground">
              Tell us about your team and timeline. We will map a plan and share
              a tailored demo.
            </p>
            <div className="space-y-4">
              {contactOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
                    key={option.title}
                  >
                    <Icon className="size-4 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">{option.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form className="rounded-3xl border border-border bg-card p-6 shadow-lg">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  className="text-muted-foreground text-xs uppercase tracking-[0.3em]"
                  htmlFor="first-name"
                >
                  First name
                </label>
                <Input
                  className="bg-background"
                  id="first-name"
                  placeholder="Avery"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-muted-foreground text-xs uppercase tracking-[0.3em]"
                  htmlFor="last-name"
                >
                  Last name
                </label>
                <Input
                  className="bg-background"
                  id="last-name"
                  placeholder="Stone"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <label
                className="text-muted-foreground text-xs uppercase tracking-[0.3em]"
                htmlFor="email"
              >
                Work email
              </label>
              <Input
                className="bg-background"
                id="email"
                placeholder="you@studio.com"
                type="email"
              />
            </div>
            <div className="mt-4 space-y-2">
              <label
                className="text-muted-foreground text-xs uppercase tracking-[0.3em]"
                htmlFor="message"
              >
                What are you building?
              </label>
              <Textarea
                className="bg-background"
                id="message"
                placeholder="Share goals, timeline, and team size."
              />
            </div>
            <Button className="mt-6 w-full" type="submit">
              Send message
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
