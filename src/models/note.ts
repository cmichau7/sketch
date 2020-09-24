import { admissions } from "src/db.js";
import { BaseModel } from './base'

export class NoteModel extends BaseModel {
  note_id: number;
  applicant_id: number;
  content: string;

  // Table name is the only required property.
  static tableName = "admissions_applicant_notes";
  static idColumn = "note_id";

}

export const Note = NoteModel.bindKnex(admissions);
