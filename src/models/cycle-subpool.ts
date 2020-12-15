import { admissions } from "src/db.js";
import { BaseModel } from "./base";

export class CycleSubpoolModel extends BaseModel {
  cycle_subpool_id: number;
  cycle_id: number;

  // Table name is the only required property.
  static tableName = "admissions_cycle_subpool";
  static idColumn = "cycle_subpool_id";
}

export const CycleSubpool = CycleSubpoolModel.bindKnex(admissions);
