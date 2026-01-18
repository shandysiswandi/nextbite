"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { ROUTE } from "@/libraries/constants/route";
import { SECURITY } from "@/libraries/constants/security";
import { getCsrfToken } from "@/libraries/utils/csrf";
import { useLocalizedRouter } from "./use-localized-router";

export function useLogoutMutation() {
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = searchParams?.toString();
  const currentPath = `${pathname}${query ? `?${query}` : ""}`;

  return useMutation({
    mutationFn: async () => {
      await axios.post(
        "/api/me/logout",
        { token: "__TOKEN__" },
        {
          headers: {
            [SECURITY.csrfHeader]: getCsrfToken() ?? "",
          },
        }
      );
    },
    onSettled: () => {
      router.push(
        `${ROUTE.auth.login}?from=${encodeURIComponent(currentPath)}`
      );
    },
  });
}
