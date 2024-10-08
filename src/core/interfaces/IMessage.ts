import { IMember } from "./IMember";

export interface IMessage {
  _id: string;
  sender: IMember;
  content: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
