import { IDBMessage, IMessage } from "@/db/mongo/types";

export interface IDatabase {
  checkConnect?: () => Promise<unknown>;
  messagesDb: Readonly<IMessagesDatabase>;
}

export interface IDatabaseInstance<T = unknown> {
  instance: T;
  isConnected: boolean;
}

export interface IMessagesDatabase {
  findAll: () => Promise<IMessage[]>;
  findById: (id: string) => Promise<IDBMessage>;
  remove: (user: IDBMessage) => Promise<IMessage>;
}
