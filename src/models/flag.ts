import { admissions } from "src/db.js";
import { BaseModel } from "./base";

// import { ApplicantFile } from "./applicant-file";

export class FlagModel extends BaseModel {
  flag_id: number;
  entity_type: string;
  entity_id: number;
  reason: string;
  proxy_id: number;
  deleted_by: number;
  deleted_reason: string;
  file_id: number | string;

  // Table name is the only required property.
  static tableName = "admissions_flag";
  static idColumn = "flag_id";

  // This object defines the relations to other models.
  // static relationMappings = (): RelationMappings => ({
  //   applicantFile: {
  //     relation: Model.HasManyRelation,
  //     modelClass: ApplicantFile,
  //     join: {
  //       from: "admissions_flag.file_id",
  //       to: "admissions_applicant_file.file_id",
  //     },
  //   },
  // });
}

export const Flag = FlagModel.bindKnex(admissions);
