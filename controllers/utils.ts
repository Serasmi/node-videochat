import type { IControllerResult } from "@/controllers/types";

interface IErrorHandlerOptions {
  headers?: Record<string, string>;
  statusCode?: number;
}

export function handleError<T = unknown>(
  error: Error,
  { headers = {}, statusCode = 400 }: IErrorHandlerOptions = {}
): IControllerResult<T> {
  // TODO: implement error handler depending on error type
  // TODO: Error logging
  console.log(error);

  return {
    headers: { "Content-Type": "application/json", ...headers },
    statusCode,
    body: {
      error: error.message,
    },
  };
}
