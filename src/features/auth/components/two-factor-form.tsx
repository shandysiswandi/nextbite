"use client";

import { useForm } from "@tanstack/react-form";
import { AuthFormLayout } from "@/features/auth/components/auth-form-layout";
import { ROUTE } from "@/libraries/constants/route";
import { Button } from "@/ui/base/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "@/ui/base/field";
import { Input } from "@/ui/base/input";
import { LocalizedLink } from "@/ui/localized-link";
import { useTwoFactorForm } from "../hooks/use-two-factor-form";
import { type MfaMethod, twoFactorSchema } from "../model/two-factor";

const modeCopy: Record<
  MfaMethod,
  { title: string; label: string; placeholder: string; description: string }
> = {
  app: {
    title: "Authenticator app",
    label: "Verification code",
    placeholder: "Enter verification code",
    description:
      "Enter the code from your two-factor authentication app or browser extension below.",
  },
  recovery: {
    title: "Recovery code",
    label: "Recovery code",
    placeholder: "Enter recovery code",
    description:
      "If you are unable to access your device or cannot receive a two-factor authentication code, enter one of your recovery codes to verify your identity.",
  },
  webauthn: {
    title: "Security key",
    label: "Use your security key",
    placeholder: "Enter your passkey or security key",
    description: "Authenticate using your passkey.",
  },
};

const modeOptions: Record<MfaMethod, { label: string; href: string }[]> = {
  app: [
    { label: "Passkey", href: ROUTE.auth.twoFactorWebauthn },
    { label: "2FA recovery code", href: ROUTE.auth.twoFactorRecovery },
  ],
  webauthn: [
    { label: "Authenticator app", href: ROUTE.auth.twoFactorApp },
    { label: "2FA recovery code", href: ROUTE.auth.twoFactorRecovery },
  ],
  recovery: [
    { label: "Authenticator app", href: ROUTE.auth.twoFactorApp },
    { label: "Passkey", href: ROUTE.auth.twoFactorWebauthn },
  ],
};

export function TwoFactorForm({ mode }: { mode: MfaMethod }) {
  const { title, label, placeholder, description } = modeCopy[mode];

  const { mutate, isPending } = useTwoFactorForm();
  const form = useForm({
    defaultValues: {
      code: "",
      method: mode,
      challengeToken: "",
    },
    validators: { onSubmit: twoFactorSchema, onChange: twoFactorSchema },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

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
      <AuthFormLayout description={description} title={title}>
        <form.Field name="code">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  inputMode={mode === "app" ? "numeric" : undefined}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={placeholder}
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

        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </Field>

        <FieldSeparator>OR</FieldSeparator>

        <Field>
          {modeOptions[mode].map((option) => (
            <Button asChild key={option.href} type="button" variant="outline">
              <LocalizedLink href={option.href}>{option.label}</LocalizedLink>
            </Button>
          ))}
        </Field>

        <Field>
          <FieldDescription className="text-center">
            <LocalizedLink href={ROUTE.auth.login}>Back to login</LocalizedLink>
          </FieldDescription>
        </Field>
      </AuthFormLayout>
    </form>
  );
}
