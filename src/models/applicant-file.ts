import { Model, QueryBuilder, RelationMappings } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

import { Flag, FlagModel } from "./flag";

export class ApplicantFileModel extends BaseModel {
  file_id: number;
  filename: string;
  file_num: number;
  path: string;
  applicant_id: number;
  type: string;
  subtype: string;
  additional: string;
  doc_id: number;
  flag?: FlagModel[];

  // Table name is the only required property.
  static tableName = "admissions_applicant_file";
  static idColumn = "file_id";

  // This object defines the relations to other models.
  static relationMappings = (): RelationMappings => ({
    flag: {
      modelClass: Flag,
      relation: Model.HasManyRelation,
      join: {
        from: "admissions_applicant_file.file_id",
        to: "admissions_flag.file_id",
      },
      filter(builder: QueryBuilder<FlagModel>) {
        builder.where("entity_type", "file");
      },
      beforeInsert(model: FlagModel) {
        model.entity_type = "file";
      },
    },
  });
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
  //     rubric: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Rubric,
  //       join: {
  //         from: "admissions_reader_rubric.rubric_id",
  //         to: "admissions_applicant_rubric_scores.rubric_id",
  //       },
  //     },
  //   }
  // };
}

export const ApplicantFile = ApplicantFileModel.bindKnex(admissions);
