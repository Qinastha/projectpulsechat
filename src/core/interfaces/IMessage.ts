import { IMember } from "./IMember";

export interface IMessage {
  sender: IMember;
  receiver: IMember;
  content: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
