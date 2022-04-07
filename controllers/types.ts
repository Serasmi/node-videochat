export interface IControllerResult<T = unknown> {
  headers: Record<string, string>;
  statusCode: number;
  body: T | { error: string };
}
