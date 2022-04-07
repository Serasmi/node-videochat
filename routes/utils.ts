import type { IControllerResult } from "@/controllers/types";
import type { NextFunction, Request, Response } from "express";

interface IAsyncController<T = IControllerResult> {
  (req: Request): Promise<T>;
}

export const httpResponseFactory =
  (asyncController: IAsyncController) =>
  (req: Request, res: Response, next: NextFunction) => {
    asyncController(req)
      .then(({ headers, statusCode, body }) => {
        if (headers) {
          res.set(headers);
        }
        res.type("json");
        res.status(statusCode).send(body);
      })
      .catch(() => {
        res.status(500).send({ error: "An unknown error occurred." });
      });
  };
