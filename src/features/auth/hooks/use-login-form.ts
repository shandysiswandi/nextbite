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
import type { LoginInput, LoginOutput } from "../model/login";

export function useLoginForm() {
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
    mutationFn: async (input: LoginInput) => {
      const response = await axios.post<LoginOutput>("/api/auth/login", input, {
        headers: {
          [SECURITY.csrfHeader]: getCsrfToken() ?? "",
        },
      });

      return response.data;
    },

    onSuccess: (output: LoginOutput) => {
      if (output.mfaRequired) {
        const twoFactorUrl = `${ROUTE.auth.twoFactorApp}?from=${encodeURIComponent(
          redirectPath
        )}`;
        router.push(twoFactorUrl);
        return;
      }

      toast.success("Welcome back!");
      router.push(redirectPath);
    },

    onError: (error) => {
      toastError(error);
    },
  });
}
