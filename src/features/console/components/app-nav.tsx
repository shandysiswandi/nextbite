"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/base/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/ui/base/sidebar";
import { LocalizedLink } from "@/ui/localized-link";

export function AppNav({
  label,
  items,
}: {
  label: string;
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = (item.items?.length ?? 0) > 0;
          const isMainActive = pathname === item.url;
          const isSubItemActive = item.items?.some(
            (sub) => sub.url === pathname
          );
          const isOpen = isSubItemActive || item.isActive;

          return (
            <Collapsible
              asChild
              className="group/collapsible"
              defaultOpen={isOpen}
              key={item.title}
            >
              <SidebarMenuItem>
                {hasSubItems ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="group"
                      // Pass isActive here if you want the parent highlighted when a child is active
                      // usually this remains false for the parent trigger, but you can change to `isActive={isSubItemActive}`
                      isActive={isMainActive}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <SidebarMenuButton
                    asChild
                    className="duration-200 ease-linear data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                    // 4. Pass isActive prop. This triggers the data-[active=true] styles
                    isActive={isMainActive}
                    tooltip={item.title}
                  >
                    <LocalizedLink href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </LocalizedLink>
                  </SidebarMenuButton>
                )}

                {hasSubItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubActive = pathname === subItem.url;

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              // Pass isActive prop here
                              className="duration-200 ease-linear data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                              isActive={isSubActive}
                            >
                              <LocalizedLink href={subItem.url}>
                                <span>{subItem.title}</span>
                              </LocalizedLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
