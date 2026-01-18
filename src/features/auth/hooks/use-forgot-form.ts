"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { SECURITY } from "@/libraries/constants/security";
import { getCsrfToken } from "@/libraries/utils/csrf";
import { toastError } from "@/libraries/utils/toast";

import type { ForgotInput } from "../model/password";

export function useForgotForm() {
  return useMutation({
    mutationFn: async (input: ForgotInput) => {
      await axios.post("/api/auth/password-forgot", input, {
        headers: {
          [SECURITY.csrfHeader]: getCsrfToken() ?? "",
        },
      });
    },

    onSuccess: () => {
      toast.success("Check your email!");
    },

    onError: (error) => {
      toastError(error);
    },
  });
}
