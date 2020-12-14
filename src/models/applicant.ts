import { Model, QueryBuilder, RelationMappings } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

import { ReaderGroup, ReaderGroupModel } from "./reader-group";
import { Score, ScoreModel } from "./score";
import { Note, NoteModel } from "./note";
import { Flag, FlagModel } from "./flag";
import { ApplicantFile, ApplicantFileModel } from "./applicantFile";

export class ApplicantModel extends BaseModel {
  applicant_id: number;
  proxy_id: number;
  student_number: string;
  cycle_subpool_id: number;
  cycle_id: number;
  reference_number: number;
  emp_id: number;
  ps_application_number: string;
  application_number: string;
  given_name: string;
  surname: string;
  sex: string;
  birthdate: string;
  age: number;
  local_telephone: string;
  cell_phone: string;
  email_address: string;
  last_university_name: string;
  total_credits: number;
  cumulative_avg: number;
  average_last_2_years: number;
  grad_indicator: string;
  aboriginal_status: string;
  apply_to_mdphd: string;
  citizenship: string;
  mcat_total: number;
  bbfl: number;
  psbb: number;
  cpbs: number;
  cars: number;
  has_reference_letters: 0 | 1;
  has_sketch_review: 0 | 1;
  application_status: string;
  w_gpa: number;
  has_citizenship: 0 | 1;
  has_three_years_full_time: 0 | 1;
  has_prerequisites: 0 | 1;
  permanent_address: string;
  mailing_address: string;
  locked: number;
  mcat_locked: 0 | 1;
  gpa_locked: 0 | 1;
  rank: number;
  weighted_rank_average: number;
  sketch_average: number;
  letter_average: number;
  readerGroup?: ReaderGroupModel[];
  scores?: ScoreModel[];
  notes?: NoteModel[];
  flags?: FlagModel[];
  applicantFile?: ApplicantFileModel[];

  // Table name is the only required property.
  static tableName = "admissions_applicant";
  static idColumn = "applicant_id";
  static virtualAttributes = ["isFlagged", "isScored"];

  get isFlagged(): boolean {
    if (this.flags && this.flags.length > 0) {
      return this.flags.some((f) => f.deleted_date === null);
    }

    return false;
  }

  get isScored(): boolean {
    if (this.scores && this.scores.length > 0) {
      return this.scores.some((s) => s.deleted_date === null);
    }

    return false;
  }

  static relationMappings = (): RelationMappings => ({
    readerGroup: {
      relation: Model.ManyToManyRelation,
      modelClass: ReaderGroup,
      join: {
        from: "admissions_applicant.applicant_id",
        through: {
          from: "admissions_reader_group_applicant.applicant_id",
          to: "admissions_reader_group_applicant.group_id",
        },
        to: "admissions_reader_group.group_id",
      },
    },
    // files: {
    //   relation: Model.HasManyRelation,
    //   modelClass: ApplicantFile,
    //   join: {
    //     from: "admissions_applicant.applicant_id",
    //     to: "admissions_applicant_file.applicant_id",
    //   },
    // },
    scores: {
      relation: Model.HasManyRelation,
      modelClass: Score,
      join: {
        from: "admissions_applicant.applicant_id",
        to: "admissions_applicant_rubric_scores.applicant_id",
      },
    },
    notes: {
      relation: Model.HasManyRelation,
      modelClass: Note,
      join: {
        from: "admissions_applicant.applicant_id",
        to: "admissions_applicant_notes.applicant_id",
      },
    },
    flags: {
      relation: Model.ManyToManyRelation,
      modelClass: Flag,
      filter(builder: QueryBuilder<FlagModel>) {
        builder.where("entity_type", "file");
      },
      beforeInsert(model: FlagModel) {
        model.entity_type = "file";
      },
      join: {
        from: "admissions_applicant.applicant_id",
        through: {
          modelClass: ApplicantFile,
          from: "admissions_applicant_file.applicant_id",
          to: "admissions_applicant_file.file_id",
        },
        to: "admissions_flag.file_id",
      },
    },
  });
}

export const Applicant = ApplicantModel.bindKnex(admissions);
