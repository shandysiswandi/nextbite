import { redirect } from "next/navigation";

import { ROUTE } from "@/libraries/constants/route";

export default function Page() {
  redirect(ROUTE.console.managements.users);
}
