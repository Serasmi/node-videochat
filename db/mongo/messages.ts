import type { Db } from "mongodb";
import type { IMessagesDatabase } from "@/db/types";
import { IDBMessage, IMessage } from "@/db/mongo/types";

interface IMakeUserDbParams {
  makeDb: () => Promise<Db>;
}

export const makeMessagesDb = ({
  makeDb,
}: IMakeUserDbParams): Readonly<IMessagesDatabase> => {
  const findAll = async (): Promise<IMessage[]> => {
    const db: Db = await makeDb();
    const result = await db.collection<IDBMessage>("users").find();
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  };

  const findById = async (): Promise<IDBMessage> => {
    // TODO: implement logic here
  };

  const remove = async (): Promise<IMessage> => {
    // TODO: implement logic here
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
