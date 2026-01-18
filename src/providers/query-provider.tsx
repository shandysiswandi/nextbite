"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { ApiError } from "@/libraries/api/exceptions";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Set a default staleTime
        // With 0 (default), React Query fetches IMMEDIATELY on every component mount.
        // Setting this to 30s means "If I fetched this user 25s ago, don't fetch again yet."
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          // Don't retry client errors (400-499)
          if (
            error instanceof ApiError &&
            error.statusCode >= 400 &&
            error.statusCode < 500
          ) {
            return false;
          }
          // Retry server errors (5xx) or network errors up to 1 times
          return failureCount < 1;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;
function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important to prevent re-creation during strict mode/hot reloads
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export function QueryProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [client] = useState(getQueryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
