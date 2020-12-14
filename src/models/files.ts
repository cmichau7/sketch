import { admissions } from "src/db.js";
import { BaseModel } from "./base";

// import { ApplicantFile } from "./applicant-file";

export class FileModel extends BaseModel {
  file_id: number;
  filename: string;
  file_num: number;
  path: string;
  applicant_id: number;
  type: string;
  subtype: string;
  additional: string;

  // Table name is the only required property.
  static tableName = "admissions_applicant_file";
  static idColumn = "file_id";

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

export const File = FileModel.bindKnex(admissions);
