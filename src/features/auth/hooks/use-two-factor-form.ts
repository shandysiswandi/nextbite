"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { ROUTE } from "@/libraries/constants/route";
import { SECURITY } from "@/libraries/constants/security";
import { useLocalizedRouter } from "@/libraries/hooks/use-localized-router";
import { getCsrfToken } from "@/libraries/utils/csrf";
import { toastError } from "@/libraries/utils/toast";
import type { TwoFactorInput } from "../model/two-factor";

export function useTwoFactorForm() {
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();
  const redirectPath = (() => {
    const from = searchParams.get("from");
    if (from?.startsWith("/") && !from.startsWith("//")) {
      return from;
    }
    return ROUTE.console.dashboard;
  })();

  return useMutation({
    mutationFn: async (input: TwoFactorInput) => {
      await axios.post(
        "/api/auth/login-mfa",
        { ...input },
        {
          headers: {
            [SECURITY.csrfHeader]: getCsrfToken() ?? "",
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("Welcome back!");
      router.push(redirectPath);
    },

    onError: (error) => {
      toastError(error);
    },
  });
}
