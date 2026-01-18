import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { TwoFactorForm } from "@/features/auth/components/two-factor-form";
import { MFA_METHODS, type MfaMethod } from "@/features/auth/model/two-factor";
import { COOKIE } from "@/libraries/constants/cookie";
import { ROUTE } from "@/libraries/constants/route";

interface Props {
  params: Promise<{ lang: string; mode: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const mode = MFA_METHODS.includes(resolvedParams.mode as MfaMethod)
    ? resolvedParams.mode
    : "";
  if (mode === "") {
    return { title: "Page Not Found" };
  }

  return { title: `Two-factor ${mode}` };
}

export function generateStaticParams() {
  return MFA_METHODS.map((mode) => ({ mode }));
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const cookieStore = await cookies();

  if (!MFA_METHODS.includes(resolvedParams.mode as MfaMethod)) {
    notFound();
  }

  const challengeToken = cookieStore.get(COOKIE.mfaChallengeToken)?.value;
  if (!challengeToken) {
    redirect(ROUTE.auth.login);
  }

  return <TwoFactorForm mode={resolvedParams.mode as MfaMethod} />;
}
