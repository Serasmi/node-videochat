import { handleError } from "@/controllers/utils";

import type { Request } from "express";
import type { IControllerResult } from "@/controllers/types";
import type { IMessagesDatabase } from "@/db/types";
import type { IMessage } from "@/db/mongo/types";

export const messagesControllerFactory = (db: IMessagesDatabase) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const deleteMessage = async (
    req: Request
  ): Promise<IControllerResult<IMessage>> => {
    const userId = req.params.id;

    if (!userId) {
      return handleError<IMessage>(new Error("You must supply a user id."));
    }

    try {
      const userToDelete = await db.findById(userId);

      if (!userToDelete) {
        return handleError<IMessage>(
          new Error("User not found, nothing to delete."),
          { statusCode: 404 }
        );
      }

      const deletedUser = await db.remove(userToDelete);

      return {
        headers,
        statusCode: 200,
        body: deletedUser,
      };
    } catch (e) {
      return handleError(e as Error);
    }
  };

  const getMessages = async (): Promise<IControllerResult<IMessage[]>> => {
    try {
      const users = await db.findAll();
      return {
        headers,
        statusCode: 200,
        body: users,
      };
    } catch (e) {
      return handleError(e as Error);
    }
  };

  const patchMessage = async (): Promise<IControllerResult<IMessage>> => {
    // TODO: implement logic here
  };

  const postMessage = async (): Promise<IControllerResult<IMessage>> => {
    // TODO: implement logic here
  };

  return { deleteMessage, getMessages, patchMessage, postMessage };
};
