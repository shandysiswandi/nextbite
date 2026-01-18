import "server-only";

import type { Profile } from "@/libraries/types/profile";

export type PermissionMap = Profile["permission"];

export function hasPermission(
  permissions: PermissionMap,
  key: string,
  action: string
) {
  return permissions[key]?.includes(action) ?? false;
}

export function hasAnyPermission(
  permissions: PermissionMap,
  requirements: Array<{ key: string; action: string }>
) {
  return requirements.some(({ key, action }) =>
    hasPermission(permissions, key, action)
  );
}
