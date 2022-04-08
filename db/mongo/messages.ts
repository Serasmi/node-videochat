import { v4 as uuidv4 } from "uuid";

import { convertFromMongoObject } from "@/db/mongo/utils";

import type { Db } from "mongodb";
import type { IMessagesDatabase } from "@/db/types";
import type { IDBMessage, IMessage } from "@/db/mongo/types";
import { IDatabaseInstance } from "@/db/types";

interface IMakeUserDbParams {
  makeDb: () => Promise<IDatabaseInstance<Db>>;
}

export const makeMessagesDb = ({
  makeDb,
}: IMakeUserDbParams): Readonly<IMessagesDatabase> => {
  const findAll = async (): Promise<IMessage[]> => {
    const { instance: db } = await makeDb();
    const result = await db.collection<IDBMessage>("users").find();
    return (await result.toArray()).map(convertFromMongoObject);
  };

  const findById = async (): Promise<IDBMessage> => {
    // TODO: implement logic here
    return { _id: uuidv4() };
  };

  const remove = async (): Promise<IMessage> => {
    // TODO: implement logic here
    return { id: uuidv4() };
  };

  return Object.freeze({
    findAll,
    // findByHash,
    findById,
    // findByPostId,
    // findReplies,
    // insert,
    remove,
    // update,
  });
};
