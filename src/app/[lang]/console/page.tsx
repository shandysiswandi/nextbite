import { redirect } from "next/navigation";

import { ROUTE } from "@/libraries/constants/route";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  redirect(`/${lang}${ROUTE.console.dashboard}`);
}
