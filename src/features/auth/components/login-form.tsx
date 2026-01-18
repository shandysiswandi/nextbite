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
import { PasswordInput } from "@/ui/base/password-input";
import { LocalizedLink } from "@/ui/localized-link";
import { Google } from "@/ui/logos/google";
import { useLoginForm } from "../hooks/use-login-form";
import { loginSchema } from "../model/login";

export function LoginForm() {
  const { mutate, isPending } = useLoginForm();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: loginSchema, onChange: loginSchema },
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
      <AuthFormLayout
        description="Please sign in and pick up right where your journey paused."
        title="Welcome Back"
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

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <LocalizedLink
                    className="ml-auto text-muted-foreground text-sm underline underline-offset-4 hover:text-primary"
                    href={ROUTE.auth.resetPassword}
                  >
                    Forgot Password?
                  </LocalizedLink>
                </div>

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

        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? "Signing in..." : "Login"}
          </Button>
        </Field>

        <FieldSeparator>OR</FieldSeparator>

        <Field>
          <Button type="button" variant="outline">
            <Google />
            Continue with Google
          </Button>

          <FieldDescription className="text-center">
            <span>Don&apos;t have an account? </span>
            <LocalizedLink href={ROUTE.auth.register}>
              Create new account
            </LocalizedLink>
          </FieldDescription>
        </Field>
      </AuthFormLayout>
    </form>
  );
}
