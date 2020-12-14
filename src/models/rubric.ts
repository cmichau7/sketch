import { Model, RelationMappings } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

// import { Subpool } from "./subpool";
// import { ReaderType } from "./reader-type";
import { RubricAnswer, RubricAnswerModel } from "./rubric-answer";
import { Score, ScoreModel } from "./score";

export class RubricModel extends BaseModel {
  rubric_id: number;
  reader_type: number;
  document_type: string;
  document_subtype: string;
  title: string;
  question: string;
  score: number;
  cycle_subpool_id: number;
  answer: RubricAnswerModel;
  scores: ScoreModel;

  // Table name is the only required property.
  static tableName = "admissions_reader_rubric";
  static idColumn = "rubric_id";

  static relationMappings = (): RelationMappings => ({
    //   subpool: {
    //     relation: Model.HasOneRelation,
    //     modelClass: Subpool,
    //     join: {
    //       from: "admissions_reader_rubric.cycle_subpool_id",
    //       through: {
    //         from: "admissions_cycle_subpool.cycle_subpool_id",
    //         to: "admissions_subpool.subpool_id"
    //       }
    //     },
    //   },
    // readerType: {
    //   relation: Model.HasOneRelation,
    //   modelClass: ReaderType,
    //   join: {
    //     from: "admissions_reader_rubric.reader_type",
    //     to: "admissions_reader_type.reader_type_id",
    //   },
    // },
    scores: {
      relation: Model.BelongsToOneRelation,
      modelClass: Score,
      join: {
        from: "admissions_reader_rubric.rubric_id",
        to: "admissions_applicant_rubric_scores.rubric_id",
      },
    },
    answer: {
      relation: Model.BelongsToOneRelation,
      modelClass: RubricAnswer,
      join: {
        from: "admissions_reader_rubric.rubric_id",
        to: "admissions_reader_rubric_answers.rubric_id",
      },
    },
  });
}

export const Rubric = RubricModel.bindKnex(admissions);
