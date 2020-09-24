import { admissions } from "src/db.js";
import { BaseModel } from "./base";

// import { Rubric } from "./rubric";

export class ScoreModel extends BaseModel {
  score_id: number;
  applicant_id: number;
  file_id?: number;
  rubric_id: number;
  score: number | [string, number][] | Map<string, unknown>;
  reader_id: number;
  proxy_id: number;
  shortname?: string;

  // Table name is the only required property.
  static tableName = "admissions_applicant_rubric_scores";
  static idColumn = "score_id";

  // This object defines the relations to other models.
  // static relationMappings = (): RelationMappings => ({
  //   const { User } = require("./user");
  //   const { Applicant } = require("./applicant");
  //   const { Rubric } = require("./rubric");
  //   return {
  //     user: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: User,
  //       join: {
  //         from: "user_data.id",
  //         to: "admissions_applicant_rubric_scores.proxy_id",
  //       },
  //     },
  //     applicant: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Applicant,
  //       join: {
  //         from: "admissions_applicant.id",
  //         to: "admissions_applicant_rubric_scores.applicant_id",
  //       },
  //     },
  // rubric: {
  //   relation: Model.BelongsToOneRelation,
  //   modelClass: Rubric,
  //   join: {
  //     from: "admissions_reader_rubric.rubric_id",
  //     to: "admissions_applicant_rubric_scores.rubric_id",
  //   },
  // },
  // });
}

export const Score = ScoreModel.bindKnex(admissions);
