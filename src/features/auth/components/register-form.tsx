"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useForm } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";
import { AuthFormLayout } from "@/features/auth/components/auth-form-layout";
import { ROUTE } from "@/libraries/constants/route";
import { getClientEnv } from "@/libraries/utils/env";
import { Button } from "@/ui/base/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "@/ui/base/field";
import { Input } from "@/ui/base/input";
import { PasswordInput } from "@/ui/base/password-input";
import { LocalizedLink } from "@/ui/localized-link";
import { Google } from "@/ui/logos/google";
import { useRegisterForm } from "../hooks/use-register-form";
import { useRegisterResend } from "../hooks/use-register-resend";
import { registerSchema } from "../model/register";

const registerStepCopy = {
  created: {
    title: "Registration successful!",
    description:
      "We've sent a verification link to your email address. Please verify your email to activate your account.",
  },
  unverified: {
    title: "Account not verified",
    description:
      "Your account is not verified yet. You can resend the verification email below.",
  },
  deactivated: {
    title: "Account deactivated",
    description:
      "Your account was previously deactivated. Please contact our support if you need help.",
  },
  notAllowed: {
    title: "Account not allowed",
    description:
      "Your account is not allowed to register right now. Please contact our support if you need help.",
  },
} as const;

export function RegisterForm() {
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [backoffSeconds, setBackoffSeconds] = useState(30);

  const turnstileRef = useRef<TurnstileInstance>(null);

  const { mutate, isPending, isSuccess, isError, step } = useRegisterForm();
  const { mutate: resendEmail, isPending: isResending } = useRegisterResend();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      captchaToken: "",
    },
    validators: { onSubmit: registerSchema, onChange: registerSchema },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  useEffect(() => {
    if (cooldownSeconds <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setCooldownSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cooldownSeconds]);

  if (step !== "idle") {
    const copy = registerStepCopy[step];
    const email = form.state.values.email;
    let resendLabel = "Resend verification email";

    if (isResending) {
      resendLabel = "Sending...";
    } else if (cooldownSeconds > 0) {
      resendLabel = `Resend in ${cooldownSeconds}s`;
    }

    return (
      <AuthFormLayout description={copy.description} title={copy.title}>
        {step === "unverified" && (
          <Field>
            <Button
              disabled={isResending || !email || cooldownSeconds > 0}
              onClick={() =>
                resendEmail(
                  { email },
                  {
                    onSettled: () => {
                      setCooldownSeconds(backoffSeconds);
                      setBackoffSeconds((next) => Math.min(next * 2, 300));
                    },
                  }
                )
              }
              type="button"
            >
              {resendLabel}
            </Button>
          </Field>
        )}

        <Field>
          <FieldDescription className="text-center">
            <LocalizedLink href={ROUTE.auth.login}>Back to login</LocalizedLink>
          </FieldDescription>
        </Field>
      </AuthFormLayout>
    );
  }

  if (isSuccess) {
    form.reset();
    turnstileRef.current?.reset();
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
        description="Let's set up your account. Tell us a bit about yourself."
        title="Create an account"
      >
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="name"
                  id={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Jane Doe"
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

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <PasswordInput
                  aria-invalid={isInvalid}
                  autoComplete="current-password"
                  id={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="●●●●●"
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
            {isPending ? "Creating account..." : "Create account"}
          </Button>

          <FieldDescription className="text-xs">
            <span>By creating an account, you agree to the </span>
            <LocalizedLink
              className="underline underline-offset-4"
              href={ROUTE.public.terms}
            >
              Terms of Service
            </LocalizedLink>
            <span>. For more information about privacy policy, see the </span>
            <LocalizedLink
              className="underline underline-offset-4"
              href={ROUTE.public.privacy}
            >
              Privacy Policy
            </LocalizedLink>
          </FieldDescription>
        </Field>

        <FieldSeparator>OR</FieldSeparator>

        <Field>
          <Button type="button" variant="outline">
            <Google />
            Continue with Google
          </Button>

          <FieldDescription className="text-center">
            <span>Already have an account? </span>
            <LocalizedLink href={ROUTE.auth.login}>Login</LocalizedLink>
          </FieldDescription>
        </Field>
      </AuthFormLayout>
    </form>
  );
}
