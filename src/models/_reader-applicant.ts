import { auth } from "src/db.js";
import { Model } from "objection";

export class ReaderApplicantModel extends Model {
  // Table name is the only required property.
  static tableName = "user_access";
  static idColumn = "rubric_id";

  // This object defines the relations to other models.
  // static relationMappings = (): RelationMappings => {
  //   const { User } = require("./user");

  //   return {
  //     user: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: User,
  //       join: {
  //         from: "user_data.id",
  //         to: "user_access.user_id",
  //       },
  //     },
  //   }
  // };
}

export const ReaderApplicant = ReaderApplicantModel.bindKnex(auth);
