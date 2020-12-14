// import { Model } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from './base'

export class PoolModel extends BaseModel {
  // Table name is the only required property.
  static tableName = "admissions_pool";
  static idColumn = "pool_id";
}

export const Pool = PoolModel.bindKnex(admissions);
