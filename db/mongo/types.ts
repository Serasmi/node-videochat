import type { Document } from "mongodb";

export interface IMessage extends Document {
  id: string;
}

export interface IDBMessage extends Omit<IMessage, "id"> {
  _id: string;
}
