import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { AppHeader } from "@/features/console/components/app-header";
import { AppSidebar } from "@/features/console/components/app-sidebar";
import { getProfile } from "@/libraries/auth/profile";
import { ROUTE } from "@/libraries/constants/route";
import type { Profile } from "@/libraries/types/profile";
import { UserProvider } from "@/providers/user-provider";
import { SidebarInset, SidebarProvider } from "@/ui/base/sidebar";

export const metadata: Metadata = {
  title: {
    default: "Console",
    template: "%s | Next Bite Console",
  },
  description: "The official description for my website.",
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  let user: Profile;

  try {
    user = await getProfile();
  } catch (error) {
    console.log("WHAT", error);

    // redirect(`/${lang}${ROUTE.auth.login}`);
    notFound();
  }

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <UserProvider user={user}>
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-col">
          <AppHeader />
          <main className="min-h-0 flex-1 overflow-auto">
            <div className="flex min-w-0 flex-col gap-4 p-4">{children}</div>
          </main>
        </SidebarInset>
      </UserProvider>
    </SidebarProvider>
  );
}
