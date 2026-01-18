import { z } from "zod";

export const forgotSchema = z.object({
  email: z.email("Please enter a valid email address"),
  captchaToken: z.string().min(1, "Please complete the captcha"),
});

export type ForgotInput = z.infer<typeof forgotSchema>;

export const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "New password must be 8-72 characters")
      .max(72, "New password must be 8-72 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetInput = z.infer<typeof resetSchema>;
