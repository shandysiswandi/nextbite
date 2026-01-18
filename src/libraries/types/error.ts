export interface AppError {
  message: string;
  errors?: Record<string, string[] | string>;
}
