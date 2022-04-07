import { Router } from "express";

import { messagesControllerFactory } from "@/controllers/messages/messagesController";
import { httpResponseFactory } from "@/routes/utils";

import type { IMessagesDatabase } from "@/db/types";

export const makeMessagesRouter = (messagesDb: IMessagesDatabase) => {
  const router = Router();
  const { deleteMessage, getMessages, patchMessage, postMessage } =
    messagesControllerFactory(messagesDb);

  router.post("/", httpResponseFactory(postMessage));
  router.get("/", httpResponseFactory(getMessages));
  router.patch("/:id", httpResponseFactory(patchMessage));
  router.delete("/:id", httpResponseFactory(deleteMessage));

  return router;
};
