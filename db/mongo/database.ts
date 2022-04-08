import { Db, MongoClient } from "mongodb";

import { config } from "@/config";
import { makeMessagesDb } from "./messages";

import type { IDatabase, IDatabaseInstance } from "@/db/types";

let dbInstance: Partial<IDatabaseInstance<Db>> = {
  isConnected: false,
};

const mongoConfig = config.mongodb.dbConfig;

const url = mongoConfig.url;
const dbName = mongoConfig.database;
const client = new MongoClient(url);

client.on("open", () => {
  console.log("[mongo]: connected");
  dbInstance.isConnected = true;
});

client.on("topologyClosed", () => {
  console.log("[mongo]: disconnected");
  dbInstance.isConnected = false;
});

const makeDb = async (): Promise<IDatabaseInstance<Db>> => {
  if (!dbInstance.isConnected) {
    await client.connect();
    dbInstance.instance = client.db(dbName);
  }

  return dbInstance as IDatabaseInstance<Db>;
};

const db: IDatabase = {
  checkConnect: () => makeDb(),
  messagesDb: makeMessagesDb({ makeDb }),
};

export default db;
