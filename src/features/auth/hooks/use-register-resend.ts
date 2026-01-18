"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { SECURITY } from "@/libraries/constants/security";
import { getCsrfToken } from "@/libraries/utils/csrf";
import { toastError } from "@/libraries/utils/toast";

import type { RegisterResendInput } from "../model/register";

export function useRegisterResend() {
  return useMutation({
    mutationFn: async (input: RegisterResendInput) => {
      await axios.post("/api/auth/register-resend", input, {
        headers: {
          [SECURITY.csrfHeader]: getCsrfToken() ?? "",
        },
      });
    },

    onSuccess: () => {
      toast.success("Verification email sent.");
    },

    onError: (error) => {
      toastError(error);
    },
  });
}
