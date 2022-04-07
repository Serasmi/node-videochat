import mongoDb from "./mongo/database";
import { config } from "@/config";
import { Db } from "@/constants/db";

import type { IDatabase } from "@/db/types";

const database: IDatabase = (() => {
  switch (config.app.currentDb) {
    case Db.mongodb:
      return mongoDb;
    default:
      throw new Error("Incorrect database type!");
  }
})();

export default database;
