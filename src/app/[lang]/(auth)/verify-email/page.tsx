import type { Metadata } from "next";

import {
  VerifyEmail,
  VerifyInvalid,
} from "@/features/auth/components/verify-email";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Verify your email",
};

const TOKEN_LENGTH = 64;

export default async function Page(props: Props) {
  const params = await props.searchParams;
  const tokenParam = params.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

  if (!token || token.length !== TOKEN_LENGTH) {
    return <VerifyInvalid />;
  }
  return <VerifyEmail token={token} />;
}
