"use client";

import { Bot, Gauge, ShieldCheck, SquareTerminal, Users } from "lucide-react";
import Image from "next/image";
import type * as React from "react";
import { APP } from "@/libraries/constants/app";
import { ROUTE } from "@/libraries/constants/route";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/base/sidebar";
import { LocalizedLink } from "@/ui/localized-link";
import { AppNav } from "./app-nav";

const data = {
  navFeatures: [
    {
      title: "Dashboard",
      url: ROUTE.console.dashboard,
      icon: Gauge,
    },
    {
      title: "Feature 1",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Page 1",
          url: ROUTE.console.feature1.page1,
        },
        {
          title: "Page 2",
          url: ROUTE.console.feature1.page2,
        },
      ],
    },
    {
      title: "Feature 2",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Page 1",
          url: ROUTE.console.feature2.page1,
        },
        {
          title: "Page 2",
          url: ROUTE.console.feature2.page2,
        },
      ],
    },
  ],
  navManagements: [
    {
      title: "Users",
      url: ROUTE.console.managements.users,
      icon: Users,
    },
    {
      title: "Policies",
      url: ROUTE.console.managements.policies,
      icon: ShieldCheck,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <LocalizedLink href={ROUTE.console.dashboard}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    alt={`${APP.name} icon`}
                    className="size-8 object-contain"
                    height={32}
                    sizes="16px"
                    src="/android-chrome-192x192.png"
                    width={32}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{APP.name} Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </LocalizedLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AppNav items={data.navFeatures} label="Features" />
        <AppNav items={data.navManagements} label="Managements" />
      </SidebarContent>
    </Sidebar>
  );
}
