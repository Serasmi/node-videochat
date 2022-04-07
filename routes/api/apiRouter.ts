import { Router } from "express";

import { makeMessagesRouter } from "./messages/messagesRouter";

import type { IDatabase } from "@/db/types";

export const makeApiRouter = (db: IDatabase) => {
  const router = Router();

  router.use("/messages", makeMessagesRouter(db.messagesDb));

  return router;
};
