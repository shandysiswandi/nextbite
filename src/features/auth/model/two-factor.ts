import { z } from "zod";

export const MFA_METHODS = ["app", "webauthn", "recovery"] as const;
export type MfaMethod = (typeof MFA_METHODS)[number];
export const MFA_TO_VALUE = {
  app: "TOTP",
  webauthn: "WebAuth",
  recovery: "BackupCode",
} as const satisfies Record<MfaMethod, string>;

export const twoFactorSchema = z.object({
  method: z.enum(MFA_METHODS),
  code: z.string().min(6, "Please enter your code"),
  challengeToken: z.string(),
});

export type TwoFactorInput = z.infer<typeof twoFactorSchema>;
