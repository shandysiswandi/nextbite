import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Register",
};

export default async function Page() {
  return <RegisterForm />;
}
