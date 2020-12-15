// TODO typings
// @ts-nocheck
import type { Scoring, Scores, Filters, Store } from "typings/types";
import { writable, derived, Writable, Readable } from "svelte/store";
// import { number, object } from "yup";
// import { ScoreModal } from "models/score";
import { ApplicantModel } from "models/applicant";
import { validateSchema } from "utils/scores";

export const applicant = writable<boolean | ApplicantModel>(false);
export const applicants = writable<ApplicantModel[]>([]);

export const scorings = writable<boolean | Map<string, Scoring>>(false);
export const scores = writable<boolean | Map<string, Scores>>(false);
export const schema = derived(scorings, ($scorings) =>
  validateSchema($scorings || [])
);

export const filters = writable<Filters>({
  query: "",
  isFlagged: 0,
  isScored: 0,
});
export const hasFilters = derived(
  filters,
  ($filters) =>
    $filters.query !== "" || $filters.isFlagged > 0 || $filters.isScored > 0
);
export const hasFlags = derived(
  filters,
  ($filters) => $filters.isFlagged > 0 || $filters.isScored > 0
);

export const store = ({
  page,
  session,
}: Store): Record<string, Readable<unknown>> => ({
  segment: derived(
    page,
    ($page) => $page.path.split("/").filter(Boolean).reverse()[0]
  ),

  // applicant: derived([session, segment], ([$session, $segment]) =>
  //   !$segment
  //     ? false
  //     : $session.applicants.find((applicant: ApplicantModel) => applicant.reference_number = $segment) || false)
});

// export const createScores = (form: Writable<unknown>): Readable<unknown> => {
//   return derived(
//     [applicant, scorings, form],
//     ([$applicant, $scorings, $form]) => {
//       //
//       console.dir("derived changed", { depth: null });
//     }
//   );
// };

// export const createScores = ({
//   scorings,
//   scores,
// }: CreateScoresContext): void => {
//   console.dir({ scorings, scores, createForm }, { depth: null });
// };

// export const score = writable<Scores>({
//   voluntaring: {
//     quality: 0,
//     quantity: 0,
//   },
//   education: {
//     quality: 0,
//     quantity: 0,
//   },
//   employment: 0,
// });
