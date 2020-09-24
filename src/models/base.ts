import { Model } from "objection";

export class BaseModel extends Model {
  updated_date: number;
  created_date: number;
  deleted_date: number | null;

  $beforeUpdate(): void {
    this.updated_date = new Date().getTime();
  }

  $beforeInsert(): void {
    const now = new Date().getTime();

    this.created_date = now;
    this.updated_date = now;
  }
}
