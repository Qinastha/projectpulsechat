import { MemberProfile } from "./MemberProfile";
import { MemberPosition } from "../types/MemberPosition";

export interface IMember {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth: Date | string;
  position: MemberPosition | null;
  profile: MemberProfile | null;
}
