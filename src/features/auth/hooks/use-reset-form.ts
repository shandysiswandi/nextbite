"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { SECURITY } from "@/libraries/constants/security";
import { getCsrfToken } from "@/libraries/utils/csrf";
import { toastError } from "@/libraries/utils/toast";

import type { ResetInput } from "../model/password";

interface Props {
  token: string;
}

export function useResetForm({ token }: Props) {
  return useMutation({
    mutationFn: async (input: ResetInput) => {
      await axios.post(
        "/api/auth/password-reset",
        { ...input, token },
        {
          headers: {
            [SECURITY.csrfHeader]: getCsrfToken() ?? "",
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("Your password has been reset.");
    },

    onError: (error) => {
      toastError(error);
    },
  });
}
