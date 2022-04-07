import { Db, MongoClient } from "mongodb";

import { config } from "@/config";
import { makeMessagesDb } from "./messages";

import type { IDatabase } from "@/db/types";

const mongoConfig = config.mongodb.dbConfig;

const url = mongoConfig.url;
const dbName = mongoConfig.database;
const client = new MongoClient(url);

let dbInstance: Db;

const makeDb = async (): Promise<Db> => {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(dbName);
  }

  return dbInstance;
};

const db: IDatabase = {
  messagesDb: makeMessagesDb({ makeDb }),
};

export default db;
