export class ApiError extends Error {
  statusCode: number;
  errors?: Record<string, string[] | string>; // Validation errors

  constructor(
    message: string,
    statusCode = 500,
    errors?: Record<string, string[] | string>
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;

    // For extending built-ins in TypeScript/Jest
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
