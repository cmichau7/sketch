import { Model, RelationMappings } from "objection";
import { admissions } from "src/db.js";
import { BaseModel } from "./base";

// import { User, UserModel } from './user';
import { ReaderGroup, ReaderGroupModel } from "./reader-group";
import { ReaderType, ReaderTypeModel } from "./reader-type";

export class ReaderModel extends BaseModel {
  reader_id: number;
  proxy_id: number;
  name: string;
  email: string;
  reader_type_id?: number;
  group_id?: number;
  cycle_id?: number;
  pool_id?: number;
  cycle_subpool_id?: number;
  readerGroup?: ReaderGroupModel;
  readerType?: ReaderTypeModel;
  groups?: Record<string, unknown>;

  // Table name is the only required property.
  static tableName = "admissions_reader";
  static idColumn = "reader_id";

  static relationMappings = (): RelationMappings => ({
    //   const { User } = require("./user");
    //   const { Group } = require("./reader-group");
    //   const { Type } = require("./reader-type");

    //   return ({
    // user: {
    //   relation: Model.BelongsToOneRelation,
    //   modelClass: User,
    //   join: {
    //     from: "admissions_reader.proxy_id",
    //     to: "user_data.id",
    //   },
    // },
    readerGroup: {
      relation: Model.BelongsToOneRelation,
      modelClass: ReaderGroup,
      join: {
        from: "admissions_reader.group_id",
        to: "admissions_reader_group.group_id",
      },
    },
    readerType: {
      relation: Model.BelongsToOneRelation,
      modelClass: ReaderType,
      join: {
        from: "admissions_reader_type.reader_type_id",
        to: "admissions_reader.reader_type_id",
      },
    },
  });

  // Validation
  // static jsonSchema = () => ({
  //   type: 'object',
  //   required: [],

  //   properties: {
  //     applicant_id: { type: 'integer' },
  //     // parentId: { type: ['integer', 'null'] },
  //     // firstName: { type: 'string', minLength: 1, maxLength: 255 },
  //     // lastName: { type: 'string', minLength: 1, maxLength: 255 },
  //     // age: { type: 'number' },

  //     // Properties defined as objects or arrays are
  //     // automatically converted to JSON strings when
  //     // writing to database and back to objects and arrays
  //     // when reading from database. To override this
  //     // behaviour, you can override the
  //     // Model.jsonAttributes property.
  //     // address: {
  //     //   type: 'object',
  //     //   properties: {
  //     //     street: { type: 'string' },
  //     //     city: { type: 'string' },
  //     //     zipCode: { type: 'string' }
  //     //   }
  //     // }
  //   }
  // })

  // Methods can be defined for model classes just as you would for
  // any JavaScript class. If you want to include the result of these
  // method in the output json, see `virtualAttributes`.
  // fullName() {
  //   return `${this.firstname} ${this.lastname}`;
  // }

  // This object defines the relations to other models.
  // static get relationMappings() {
  //   // Importing models here is a one way to avoid require loops.
  //   const ApplicantAccess = require("./ApplicantAccess").default;
  //   return {
  //     access: {
  //       relation: Model.HasOneRelation,
  //       modelClass: ApplicantAccess,
  //       join: {
  //         from: "user_data.id",
  //         to: "user_access.user_id"
  //       }
  //     }
  //   };
  // }
}

export const Reader = ReaderModel.bindKnex(admissions);
