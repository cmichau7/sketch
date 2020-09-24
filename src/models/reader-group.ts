import { Model, RelationMappings } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

import { ReaderType } from "./reader-type";

export class ReaderGroupModel extends BaseModel {
  group_id: number;

  // Table name is the only required property.
  static tableName = "admissions_reader_group";
  static idColumn = "group_id";

  static relationMappings = (): RelationMappings => ({
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
