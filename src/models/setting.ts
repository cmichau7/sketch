import { admissions } from "src/db.js";
import { BaseModel } from "./base";

export class SettingModel extends BaseModel {
  shortname: string;
  value: string;

  // Table name is the only required property.
  static tableName = "settings";
  static idColumn = "setting_id";
}

export const Setting = SettingModel.bindKnex(admissions);
