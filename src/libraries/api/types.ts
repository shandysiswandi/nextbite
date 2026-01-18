import type { Meta } from "@/libraries/types/meta";

export interface ApiEnvelope<TData> {
  message: string;
  data: TData;
  meta?: Meta;
}

export interface ApiErrorResponse {
  message: string;
  error?: Record<string, string>;
}

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;
