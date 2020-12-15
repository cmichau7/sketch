import { Model, RelationMappings } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

import { Cycle } from "./cycle";
import { ReaderType } from "./reader-type";

export class ReaderGroupModel extends BaseModel {
  group_id: number;
  cycle_subpool_id: number;

  // Table name is the only required property.
  static tableName = "admissions_reader_group";
  static idColumn = "group_id";

  static relationMappings = (): RelationMappings => ({
    cycle: {
      relation: Model.HasOneThroughRelation,
      modelClass: Cycle,
      join: {
        from: "admissions_reader_group.cycle_subpool_id",
        through: {
          from: "admissions_cycle_subpool.cycle_subpool_id",
          to: "admissions_cycle_subpool.cycle_id",
        },
        to: "admissions_cycle.cycle_id",
      },
    },
    readerType: {
      relation: Model.ManyToManyRelation,
      modelClass: ReaderType,
      join: {
        from: "admissions_reader_group.group_id",
        through: {
          from: "admissions_reader.group_id",
          to: "admissions_reader.reader_type_id",
        },
        to: "admissions_reader_type.reader_type_id",
      },
    },
  });
}

export const ReaderGroup = ReaderGroupModel.bindKnex(admissions);
