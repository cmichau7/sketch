import { Writable, Readable } from "svelte/store";
import { ObjectSchema } from "yup";

// Generic
export type Primitive = string | number | boolean;
export type Callback = (
  x: Primitive | null,
  y?: string,
  z?: Record<string, unknown>
) => boolean;

// TODO make Grade, MultipleGrade Scores more flexible
export type Grade = 0 | 1 | 2 | 3;
export type Grades = Record<string, Grade>;
export interface Scores {
  [key: string]: Grades | Grade;
}

export type Flag = 0 | 1 | 2;
export interface Filters {
  query: string;
  isFlagged: Flag;
  isScored: Flag;
}

export interface Page {
  host: string;
  path: string;
  params: Record<string, unknown>;
  query: Record<string, unknown>;
}
export interface Store {
  page: Readable<Page>;
  session: Writable<unknown>;
}

export type Scoring = {
  [key: string]: { min: number; max: number };
};
export type Scorings = [string, Scoring][] | Map<string, Scoring>;

export interface CreateScoresContext {
  scores: Scorings;
  scorings: Scorings;
  schema: ObjectSchema;
}

// export interface CreateScores {
//   //
// }
