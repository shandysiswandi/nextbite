"use client";

import { Bell, LogOut, Settings, User } from "lucide-react";

import { ROUTE } from "@/libraries/constants/route";
import { useLogoutMutation } from "@/libraries/hooks/use-profile";
import { getInitials } from "@/libraries/utils/user";
import { useUser } from "@/providers/user-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/base/avatar";
import { Button } from "@/ui/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/base/dropdown-menu";
import { LocalizedLink } from "@/ui/localized-link";

export function NavUser() {
  const user = useUser();
  const { mutate, isPending } = useLogoutMutation();
  const initials = getInitials(user?.name ?? "User");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-12 gap-3 rounded-full px-2 text-left data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          variant="ghost"
        >
          <Avatar className="size-8 rounded-full">
            <AvatarImage alt={user?.name} src={user?.avatar} />
            <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-full">
              <AvatarImage alt={user?.name} src={user?.avatar} />
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.name}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <LocalizedLink href={ROUTE.console.me.root}>
              <User />
              Profile
            </LocalizedLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <LocalizedLink href={ROUTE.console.me.notifications}>
              <Bell />
              Notifications
            </LocalizedLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <LocalizedLink href={ROUTE.console.me.settings}>
              <Settings />
              Settings
            </LocalizedLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={() => mutate()}
          variant="destructive"
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
