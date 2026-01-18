"use client";

import { createContext, useContext } from "react";

import type { Profile } from "@/libraries/types/profile";

const UserContext = createContext<Profile | null>(null);

interface UserProviderProps {
  user: Profile;
  children: React.ReactNode;
}

export function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return value;
}
