import {IMember} from "./IMember";

export interface IProject {
    _id: string;
    projectName: string;
    projectDescription: string;
    projectAvatar: string;
    members: IMember[];
    isCompleted: boolean;
}