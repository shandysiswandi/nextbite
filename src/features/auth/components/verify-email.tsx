"use client";

import { useEffect } from "react";
import { AuthFormLayout } from "@/features/auth/components/auth-form-layout";
import { ROUTE } from "@/libraries/constants/route";
import { Field, FieldDescription } from "@/ui/base/field";
import { Spinner } from "@/ui/base/spinner";
import { LocalizedLink } from "@/ui/localized-link";
import { useRegisterVerify } from "../hooks/use-register-verify";

interface Props {
  token: string;
}

export function VerifyEmail({ token }: Props) {
  const { isSuccess, isError, isIdle, mutate } = useRegisterVerify({ token });

  useEffect(() => {
    if (isIdle) {
      mutate();
    }
  }, [isIdle, mutate]);

  if (isSuccess) {
    return <VerifySuccess />;
  }
  if (isError) {
    return <VerifyFailed />;
  }

  return <VerifyLoading />;
}

export function VerifyInvalid() {
  return (
    <AuthFormLayout
      description="The verification link is missing or malformed. Please request a new one."
      title="Invalid verification link"
    >
      <Field>
        <FieldDescription className="text-center">
          <LocalizedLink href={ROUTE.auth.register}>
            Back to create new account
          </LocalizedLink>
        </FieldDescription>
      </Field>
    </AuthFormLayout>
  );
}

function VerifyLoading() {
  return (
    <AuthFormLayout
      description="Hold tight. We're confirming your email address."
      title="Verifying your email"
    >
      <Field className="flex items-center justify-center">
        <Spinner />
      </Field>
    </AuthFormLayout>
  );
}

function VerifySuccess() {
  return (
    <AuthFormLayout
      description="Your account is now active. You can sign in with your credentials."
      title="Email verified"
    >
      <Field>
        <FieldDescription className="text-center">
          <LocalizedLink href={ROUTE.auth.login}>Back to login</LocalizedLink>
        </FieldDescription>
      </Field>
    </AuthFormLayout>
  );
}

function VerifyFailed() {
  return (
    <AuthFormLayout
      description="This link may have expired or already been used. Please request a new verification email."
      title="Verification failed"
    >
      <Field>
        <FieldDescription className="text-center">
          <LocalizedLink href={ROUTE.auth.register}>
            Back to create new account
          </LocalizedLink>
        </FieldDescription>
      </Field>
    </AuthFormLayout>
  );
}
