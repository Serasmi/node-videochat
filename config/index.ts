import { envVarsSchema } from "./utils/validation";

import type { IConfig } from "./types";

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: IConfig = {
  app: {
    currentDb: envVars.APP_CURRENT_DB,
    port: 3001,
  },
  mongodb: {
    dbConfig: {
      url: envVars.MONGODB_URL,
      database: envVars.MONGODB_DATABASE,
    },
  },
};

export type { IConfig } from "./types";
