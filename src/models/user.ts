import type { RelationMappings } from "objection";
import type { UserAccessModel } from "./user-access";
import { Model } from "objection";
import { auth } from "src/db.js";
import { BaseModel } from "./base";

import { UserAccess } from "./user-access";

export class UserModel extends BaseModel {
  id: number;
  access: UserAccessModel;

  // Table name is the only required property.
  static tableName = "user_data";
  static idColumn = "id";

  static relationMappings = (): RelationMappings => ({
    access: {
      relation: Model.HasOneRelation,
      modelClass: UserAccess,
      join: {
        from: "user_data.id",
        to: "user_access.user_id",
      },
    },
  });
}

export const User = UserModel.bindKnex(auth);
