import { accountType } from "./accountType.ts";

export interface User {
  id: number;
  mobile: string;
  isFirstLogin: boolean;
  isDeleted: boolean;
  accountType: accountType["id"];
}
