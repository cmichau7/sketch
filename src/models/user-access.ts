import { auth } from "src/db.js";
import { BaseModel } from "./base";

export class UserAccessModel extends BaseModel {
  role: string;
  account_active: boolean;

  // Table name is the only required property.
  static tableName = "user_access";
  static idColumn = "id";
}

export const UserAccess = UserAccessModel.bindKnex(auth);
