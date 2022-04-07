import { IDBMessage, IMessage } from "@/db/mongo/types";

export interface IDatabase {
  messagesDb: Readonly<IMessagesDatabase>;
}

export interface IMessagesDatabase {
  findAll: () => Promise<IMessage[]>;
  findById: (id: string) => Promise<IDBMessage>;
  remove: (user: IDBMessage) => Promise<IMessage>;
}
