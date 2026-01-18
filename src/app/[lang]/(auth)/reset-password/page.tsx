import type { Metadata } from "next";

import { ForgotForm } from "@/features/auth/components/forgot-form";
import { ResetForm, ResetInvalid } from "@/features/auth/components/reset-form";

const TOKEN_LENGTH = 64;

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.searchParams;
  const hasToken = !!params.token;
  const title = hasToken ? "Change your password" : "Forgot your password?";

  return { title };
}

export default async function Page(props: Props) {
  const params = await props.searchParams;
  const tokenParam = params.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

  if (!token) {
    return <ForgotForm />;
  }
  if (token.length !== TOKEN_LENGTH) {
    return <ResetInvalid />;
  }

  return <ResetForm token={token} />;
}
