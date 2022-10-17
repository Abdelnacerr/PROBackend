import { accountType } from "./accountType.ts";

export interface User extends accountType {
  id: number;
  mobile: string;
  isFirstLogin: boolean;
  isDeleted: boolean;
  accountTypeId: accountType["id"];
}
