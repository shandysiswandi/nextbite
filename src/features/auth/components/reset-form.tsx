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
} from "@/ui/base/field";
import { PasswordInput } from "@/ui/base/password-input";
import { LocalizedLink } from "@/ui/localized-link";
import { useResetForm } from "../hooks/use-reset-form";
import { resetSchema } from "../model/password";

export function ResetForm({ token }: { token: string }) {
  const { mutate, isPending, isSuccess } = useResetForm({ token });
  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validators: { onSubmit: resetSchema, onChange: resetSchema },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  if (isSuccess) {
    form.reset();
    return <ResetSuccess />;
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
        description="Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter."
        title="Change password"
      >
        <form.Field name="newPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>New password</FieldLabel>
                <PasswordInput
                  aria-invalid={isInvalid}
                  autoComplete="new-password"
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

        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <PasswordInput
                  aria-invalid={isInvalid}
                  autoComplete="new-password"
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

        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? "Updating..." : "Change password"}
          </Button>
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

export function ResetInvalid() {
  return (
    <AuthFormLayout
      description="It looks like you clicked on an invalid password reset link. Please try again."
      title="Invalid Reset Link"
    >
      <Field>
        <FieldDescription className="text-center">
          <LocalizedLink href={ROUTE.auth.login}>Back to login</LocalizedLink>
        </FieldDescription>
      </Field>
    </AuthFormLayout>
  );
}

function ResetSuccess() {
  return (
    <AuthFormLayout
      description="Your password has been changed successfully. You can now sign in with your new password."
      title="Password updated"
    >
      <Field>
        <FieldDescription className="text-center">
          <LocalizedLink href={ROUTE.auth.login}>Back to login</LocalizedLink>
        </FieldDescription>
      </Field>
    </AuthFormLayout>
  );
}
