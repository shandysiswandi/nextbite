"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useForm } from "@tanstack/react-form";
import { useRef } from "react";
import { AuthFormLayout } from "@/features/auth/components/auth-form-layout";
import { ROUTE } from "@/libraries/constants/route";
import { getClientEnv } from "@/libraries/utils/env";
import { Button } from "@/ui/base/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/ui/base/field";
import { Input } from "@/ui/base/input";
import { LocalizedLink } from "@/ui/localized-link";
import { useForgotForm } from "../hooks/use-forgot-form";
import { forgotSchema } from "../model/password";

export function ForgotForm() {
  const turnstileRef = useRef<TurnstileInstance>(null);

  const { mutate, isPending, isSuccess, isError } = useForgotForm();
  const form = useForm({
    defaultValues: {
      email: "",
      captchaToken: "",
    },
    validators: { onSubmit: forgotSchema, onChange: forgotSchema },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  if (isSuccess) {
    form.reset();
    turnstileRef.current?.reset();
    return <ForgotSuccess />;
  }

  if (isError) {
    turnstileRef.current?.reset();
  }

  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <AuthFormLayout
        description="Enter your user account's verified email address and we will send you a password reset link."
        title="Reset your password"
      >
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="email"
                  id={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="m@example.com"
                  value={field.state.value}
                />
                {isInvalid && (
                  <FieldError
                    className="text-xs"
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="captchaToken">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <Turnstile
                  onSuccess={(token) => field.handleChange(token)}
                  options={{ size: "flexible" }}
                  ref={turnstileRef}
                  siteKey={getClientEnv().turnstileTiteKey}
                />
                {isInvalid && (
                  <FieldError
                    className="text-xs"
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? "Sending..." : "Send reset link"}
          </Button>

          <FieldDescription className="text-center">
            <span>Remembered your password? </span>
            <LocalizedLink href={ROUTE.auth.login}>Back to login</LocalizedLink>
          </FieldDescription>
        </Field>
      </AuthFormLayout>
    </form>
  );
}

function ForgotSuccess() {
  return (
    <AuthFormLayout
      description="Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
      title="Reset your password"
    >
      <Field>
        <FieldDescription className="text-center">
          <LocalizedLink href={ROUTE.auth.login}>Back to login</LocalizedLink>
        </FieldDescription>
      </Field>
    </AuthFormLayout>
  );
}
