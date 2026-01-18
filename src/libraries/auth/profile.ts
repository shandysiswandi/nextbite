import "server-only";

import { cache } from "react";
import { apiGet } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import type { Profile } from "@/libraries/types/profile";

export const getProfile = cache(async (): Promise<Profile> => {
  const { data: user } = await apiGet<{
    id: string;
    email: string;
    full_name: string;
    avatar_url: string;
    status: string;
  }>(API_PATH.identity.me.profile);
  const { data: perm } = await apiGet<{
    permissions: Record<string, string[]>;
  }>(API_PATH.identity.me.permissions);

  return {
    id: user.id,
    email: user.email,
    name: user.full_name,
    avatar: user.avatar_url,
    status: user.status,
    permission: perm.permissions,
  };
});
