"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { SECURITY } from "@/libraries/constants/security";
import { getCsrfToken } from "@/libraries/utils/csrf";
import { toastError } from "@/libraries/utils/toast";

interface Props {
  token: string;
}

export function useRegisterVerify({ token }: Props) {
  return useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await axios.post(
        "/api/auth/register-verify",
        { token },
        {
          headers: {
            [SECURITY.csrfHeader]: getCsrfToken() ?? "",
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("Your email has been verified.");
    },

    onError: (error) => {
      toastError(error);
    },
  });
}
