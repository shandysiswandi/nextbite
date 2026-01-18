import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  avatar: z.string(),
  status: z.string(),
  permission: z.record(z.string(), z.array(z.string())),
});

export type Profile = z.infer<typeof profileSchema>;
