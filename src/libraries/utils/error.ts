import "server-only";

import { NextResponse } from "next/server";

import { ApiError } from "@/libraries/api/exceptions";
import type { AppError } from "@/libraries/types/error";

export function catchError(error: unknown): NextResponse<AppError> {
  if (process.env.NODE_ENV !== "production") {
    console.log("APP_ERROR", error);
  }

  if (error instanceof ApiError) {
    return NextResponse.json<AppError>(
      { message: error.message, errors: error.errors },
      { status: error.statusCode }
    );
  }

  return NextResponse.json<AppError>(
    { message: "An unexpected error occurred" },
    { status: 500 }
  );
}
