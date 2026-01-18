"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { SECURITY } from "@/libraries/constants/security";
import { getCsrfToken } from "@/libraries/utils/csrf";
import { toastError } from "@/libraries/utils/toast";

import type { RegisterInput } from "../model/register";

type RegisterStep =
  | "idle"
  | "created"
  | "unverified"
  | "deactivated"
  | "notAllowed";

const unverifiedAccountMessage = "Account not verified";
const deactivatedAccountMessage = "Account deactivated";
const notAllowedAccountMessage = "Account not allowed";

function getStepFromError(error: unknown): RegisterStep | null {
  if (!(isAxiosError(error) && error.response)) {
    return null;
  }

  if (error.response.status !== 409) {
    return null;
  }

  const data = error.response.data as { message?: string };
  const message = data?.message ?? "";

  if (message === unverifiedAccountMessage) {
    return "unverified";
  }
  if (message === deactivatedAccountMessage) {
    return "deactivated";
  }
  if (message === notAllowedAccountMessage) {
    return "notAllowed";
  }

  return null;
}

export function useRegisterForm() {
  const [step, setStep] = useState<RegisterStep>("idle");

  const mutation = useMutation({
    mutationFn: async (input: RegisterInput) => {
      await axios.post("/api/auth/register", input, {
        headers: {
          [SECURITY.csrfHeader]: getCsrfToken() ?? "",
        },
      });
    },

    onSuccess: () => {
      toast.success("Check your email to verify your account.");
      setStep("created");
    },

    onError: (error) => {
      const nextStep = getStepFromError(error);
      if (nextStep) {
        setStep(nextStep);
      }
      toastError(error);
    },
  });

  return { ...mutation, step };
}
