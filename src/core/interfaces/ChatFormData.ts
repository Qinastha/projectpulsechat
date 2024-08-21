import {IMember} from "./IMember";
import {IProject} from "./IProject";

export interface ChatFormDataInputs {
    name: string;
    description: string;
    avatar: string | null;
    members: IMember[];
    currentProject: IProject;
}