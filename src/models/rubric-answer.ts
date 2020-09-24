import { admissions } from "src/db.js";
import { BaseModel } from "./base";

// import { Subpool } from "./subpool";
import { ReaderType } from "./reader-type";

export class RubricAnswerModel extends BaseModel {
  answer_id: number;
  rubric_id: number;
  value: string | number;
  text: string;

  // Table name is the only required property.
  static tableName = "admissions_reader_rubric_answers";
  static idColumn = "answer_id";

  // static relationMappings = (): RelationMappings => ({
  //   //   subpool: {
  //   //     relation: Model.HasOneRelation,
  //   //     modelClass: Subpool,
  //   //     join: {
  //   //       from: "admissions_reader_rubric.cycle_subpool_id",
  //   //       through: {
  //   //         from: "admissions_cycle_subpool.cycle_subpool_id",
  //   //         to: "admissions_subpool.subpool_id"
  //   //       }
  //   //     },
  //   //   },
  //   readerType: {
  //     relation: Model.HasOneRelation,
  //     modelClass: ReaderType,
  //     join: {
  //       from: "admissions_reader_rubric.cycle_subpool_id",
  //       to: "admissions_cycle_subpool.cycle_subpool_id",
  //     },
  //   },
  // });
}

export const RubricAnswer = RubricAnswerModel.bindKnex(admissions);
