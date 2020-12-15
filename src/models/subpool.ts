import type { RelationMappings } from "objection";
import { Model } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

import { Pool } from "./pool";

export class SubpoolModel extends BaseModel {
  // Table name is the only required property.
  static tableName = "admissions_subpool";
  static idColumn = "subpool_id";

  static relationMappings = (): RelationMappings => ({
    subpool: {
      relation: Model.HasOneRelation,
      modelClass: Pool,
      join: {
        from: "admissions_subpool.pool_id",
        to: "admissions_pool.pool_id",
      },
    },
  });
}
export const Subpool = SubpoolModel.bindKnex(admissions);
