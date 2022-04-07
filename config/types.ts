import type { Db } from "@/constants/db";

export interface IAppConfig {
  currentDb: Db;
  port: number;
}

export interface IMongoDBConfig {
  url: string;
  database: string;
}

export interface IMongoConfig {
  dbConfig: IMongoDBConfig;
}

export interface IConfig {
  app: IAppConfig;
  mongodb: IMongoConfig;
}
