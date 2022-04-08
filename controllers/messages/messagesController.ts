import { handleError } from "@/controllers/utils";

import type { Request } from "express";
import type { IControllerResult } from "@/controllers/types";
import type { IMessagesDatabase } from "@/db/types";
import type { IMessage } from "@/db/mongo/types";
import { convertFromMongoObject } from "@/db/mongo/utils";

export const messagesControllerFactory = (db: IMessagesDatabase) => {
  const _entity = "message";

  const headers = {
    "Content-Type": "application/json",
  };

  const deleteMessage = async (
    req: Request
  ): Promise<IControllerResult<IMessage>> => {
    const { id } = req.params;

    if (!id) {
      return handleError<IMessage>(
        new Error(`You must supply a ${_entity} id.`)
      );
    }

    try {
      const entityToDelete = await db.findById(id);

      if (!entityToDelete) {
        return handleError<IMessage>(
          new Error(`No ${_entity} was found, nothing to delete.`),
          { statusCode: 404 }
        );
      }

      const deletedEntity = await db.remove(entityToDelete);

      return {
        headers,
        statusCode: 200,
        body: deletedEntity,
      };
    } catch (e) {
      return handleError(e as Error);
    }
  };

  const getMessages = async (): Promise<IControllerResult<IMessage[]>> => {
    try {
      const entities = await db.findAll();
      return {
        headers,
        statusCode: 200,
        body: entities,
      };
    } catch (e) {
      return handleError(e as Error);
    }
  };

  const patchMessage = async (
    req: Request
  ): Promise<IControllerResult<IMessage>> => {
    // TODO: implement logic here
    const { id } = req.params;
    const entity = await db.findById(id);
    return {
      headers,
      statusCode: 200,
      body: convertFromMongoObject(entity),
    };
  };

  const postMessage = async (
    req: Request
  ): Promise<IControllerResult<IMessage>> => {
    // TODO: implement logic here
    const { id } = req.params;
    const entity = await db.findById(id);
    return {
      headers,
      statusCode: 200,
      body: convertFromMongoObject(entity),
    };
  };

  return { deleteMessage, getMessages, patchMessage, postMessage };
};
