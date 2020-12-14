import { Model, RelationMappings } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

import { Rubric, RubricModel } from "./rubric";
import { Score, ScoreModel } from "./score";
import { Scorings } from "typings/types";

export class ReaderTypeModel extends BaseModel {
  name: string;
  shortname: string;
  rubric?: RubricModel;
  scores: ScoreModel[];
  scoring?: Scorings;
  rubric_id?: number;

  // Table name is the only required property.
  static tableName = "admissions_reader_type";
  static idColumn = "reader_type_id";

  static relationMappings = (): RelationMappings => ({
    scores: {
      relation: Model.ManyToManyRelation,
      modelClass: Score,
      join: {
        from: "admissions_reader_type.reader_type_id",
        through: {
          from: "admissions_reader_rubric.reader_type",
          to: "admissions_reader_rubric.rubric_id",
        },
        to: "admissions_applicant_rubric_scores.rubric_id",
      },
    },
    rubric: {
      relation: Model.BelongsToOneRelation,
      modelClass: Rubric,
      join: {
        from: "admissions_reader_type.reader_type_id",
        to: "admissions_reader_rubric.reader_type",
      },
    },
  });
}

export const ReaderType = ReaderTypeModel.bindKnex(admissions);
