import { UserType } from "./userType.ts";

export interface User extends UserType {
  id: number;
  mobile: string;
  isDeleted: boolean;
  typeId: UserType["id"];
}
