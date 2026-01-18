"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { ROUTE } from "@/libraries/constants/route";
import { cn } from "@/libraries/utils/tailwind";
import { Button } from "@/ui/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/base/dropdown-menu";
import { ScrollArea } from "@/ui/base/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/base/tooltip";
import { LocalizedLink } from "@/ui/localized-link";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Order shipped",
    description: "Order #4312 is on the way and arriving tomorrow.",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    title: "New comment",
    description: "Maya left feedback on the Q3 planning doc.",
    time: "1h ago",
    read: false,
  },
  {
    id: "3",
    title: "Deployment successful",
    description:
      "Project 'BiteUI-Core' v2.4.0 has been deployed to production.",
    time: "3h ago",
    read: false,
  },
  {
    id: "4",
    title: "Payment received",
    description: "Receipt for invoice #INV-2024-001 is available for download.",
    time: "5h ago",
    read: true,
  },
];

export function NavNotification() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const handleMarkAllRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, read: true })));
  };

  const handleItemRead = (id: string) => {
    setNotifications((items) =>
      items.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const unreadCount = notifications.filter((item) => !item.read).length;
  const badgeLabel = unreadCount > 9 ? "9+" : `${unreadCount}`;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="relative rounded-full"
              size="icon"
              variant="ghost"
            >
              <Bell className="size-4" />
              <span className="sr-only">Notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-medium text-[10px] text-primary-foreground">
                  {badgeLabel}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        className="w-80"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center justify-between px-2 py-1.5">
          <span className="font-medium text-sm">Notifications</span>
          <Button
            className="h-auto p-0 text-muted-foreground text-xs hover:text-foreground"
            disabled={unreadCount === 0}
            onClick={handleMarkAllRead}
            size="sm"
            variant="ghost"
          >
            Mark all as read
          </Button>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <ScrollArea className="h-64">
          <div className="flex flex-col gap-1 p-1">
            {notifications.length === 0 && (
              <div className="py-4 text-center text-muted-foreground text-sm">
                No notifications
              </div>
            )}
            {notifications.map((item) => (
              <DropdownMenuItem
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-1 rounded-md px-2 py-2 text-left transition-colors",
                  item.read
                    ? "opacity-70"
                    : "bg-muted/40 font-medium hover:bg-muted"
                )}
                key={item.id}
                onSelect={() => handleItemRead(item.id)}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="text-sm leading-none">{item.title}</span>
                  <span className="whitespace-nowrap text-[10px] text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <span className="line-clamp-2 text-muted-foreground text-xs leading-snug">
                  {item.description}
                </span>
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer justify-center text-center text-muted-foreground focus:bg-muted focus:text-foreground"
        >
          <LocalizedLink
            className="w-full"
            href={ROUTE.console.me.notifications}
          >
            View all
          </LocalizedLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
