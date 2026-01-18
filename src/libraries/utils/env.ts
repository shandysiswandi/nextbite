import { z } from "zod";

interface ServerEnvironment {
  apiUrl: string;
  apiProxyEnable: boolean;
}

interface ClientEnvironment {
  turnstileTiteKey: string;
}

// Define schemas
const serverEnvSchema = z.object({
  API_URL: z.string().url(),
  API_PROXY_ENABLE: z
    .string()
    .transform((val) => val === "true" || val === "1"),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1),
});

function parseServerEnv(): ServerEnvironment | null {
  const rawEnv = {
    API_URL: process.env.API_URL,
    API_PROXY_ENABLE: process.env.API_PROXY_ENABLE,
  };

  const result = serverEnvSchema.safeParse(rawEnv);

  if (!result.success) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "❌ Invalid server environment variables:",
        result.error.format()
      );
    }
    return null;
  }

  return {
    apiUrl: result.data.API_URL,
    apiProxyEnable: result.data.API_PROXY_ENABLE,
  };
}

function parseClientEnv(): ClientEnvironment | null {
  const rawEnv = {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  };

  const result = clientEnvSchema.safeParse(rawEnv);

  if (!result.success) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "❌ Invalid client environment variables:",
        result.error.format()
      );
    }
    return null;
  }

  return {
    turnstileTiteKey: result.data.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  };
}

let cachedServerEnv: ServerEnvironment | null = null;
let cachedClientEnv: ClientEnvironment | null = null;

export function getServerEnv(): ServerEnvironment {
  if (!cachedServerEnv) {
    cachedServerEnv = parseServerEnv();

    if (!cachedServerEnv) {
      throw new Error("Server environment variables are not configured");
    }
  }

  return cachedServerEnv;
}

export function getClientEnv(): ClientEnvironment {
  if (!cachedClientEnv) {
    cachedClientEnv = parseClientEnv();

    if (!cachedClientEnv) {
      throw new Error("Client  environment variables are not configured");
    }
  }

  return cachedClientEnv;
}

export function useEnv() {
  if (typeof window === "undefined") {
    throw new Error("useEnv can only be used in client components");
  }

  return getClientEnv();
}

export const isProduction = process.env.NODE_ENV === "production";
