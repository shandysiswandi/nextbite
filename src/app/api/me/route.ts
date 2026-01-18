import { NextResponse } from "next/server";

import { apiGet } from "@/libraries/api/api";
import { API_PATH } from "@/libraries/constants/api";
import type { Profile } from "@/libraries/types/profile";
import { catchError } from "@/libraries/utils/error";

interface Response {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  status: string;
}

interface ResponsePermission {
  permissions: Record<string, string[]>;
}

export async function GET() {
  try {
    const { data: user } = await apiGet<Response>(API_PATH.identity.me.profile);
    const { data: perm } = await apiGet<ResponsePermission>(
      API_PATH.identity.me.permissions
    );

    return NextResponse.json<Profile>({
      id: user.id,
      email: user.email,
      name: user.full_name,
      avatar: user.avatar_url,
      status: user.status,
      permission: perm.permissions,
    });
  } catch (error: unknown) {
    return catchError(error);
  }
}
