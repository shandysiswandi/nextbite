import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Please enter your name")
    .max(100, "Please enter your name")
    .regex(/^[a-zA-Z\s]+$/, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  captchaToken: z.string().min(1, "Please complete the captcha"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const registerResendSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type RegisterResendInput = z.infer<typeof registerResendSchema>;
