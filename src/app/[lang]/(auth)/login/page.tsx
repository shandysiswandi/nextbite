import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  return <LoginForm />;
}
