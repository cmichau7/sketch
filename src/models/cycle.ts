import type { CycleSubpoolModel } from "./cycle-subpool";
import { Model, RelationMappings } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

import { CycleSubpool } from "./cycle-subpool";

export class CycleModel extends BaseModel {
  cycle_id: number;
  cycleSubpool: CycleSubpoolModel[];

  // Table name is the only required property.
  static tableName = "admissions_cycle";
  static idColumn = "cycle_id";

  static relationMappings = (): RelationMappings => ({
    cycleSubpool: {
      relation: Model.HasManyRelation,
      modelClass: CycleSubpool,
      join: {
        from: "admissions_cycle.cycle_id",
        to: "admissions_cycle_subpool.cycle_id",
      },
    },
  });
}

export const Cycle = CycleModel.bindKnex(admissions);
