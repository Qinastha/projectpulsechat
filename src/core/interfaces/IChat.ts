import {IMessage} from "./IMessage";
import {IMember} from "./IMember";
import {IProject} from "./IProject";

export interface IChat{
    _id: string;
    messages: IMessage[];
    members: IMember[];
    createdAt: string;
    updatedAt: string;
    avatar: string;
    name: string;
    description: string;
    currentProject: IProject;
}