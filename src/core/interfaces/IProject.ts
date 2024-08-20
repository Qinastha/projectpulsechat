import { IMember } from "./IMember";
import { IChat } from "./IChat";

export interface IProject {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectAvatar: string;
  members: IMember[];
  isCompleted: boolean;
  chats: IChat[];
}
