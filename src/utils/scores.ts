import { object, number, ObjectSchema } from "yup";
import { ReaderTypeModel } from "models/reader-type";
import { ScoreModel } from "models/score";
import { Scoring, Scorings } from "typings/types";

const getConstraints = (type: ReaderTypeModel): string => {
  const constraints =
    type.rubric?.answer?.text.replace(/\s/g, "") ||
    (type.rubric?.answer?.value
      ? `score:0:${type.rubric?.answer?.value}`
      : "score:0:2");

  // TODO validate

  return constraints;
};

export const formatConstraints = (
  types: ReaderTypeModel[]
): ReaderTypeModel[] =>
  types.map((type) => {
    const constraints = getConstraints(type);

    const scorings = constraints.split(",").reduce((map, score) => {
      const [name, min, max] = score.split(":");
      const constraint = { min: parseInt(min), max: parseInt(max) };

      if (map.has(type.shortname)) {
        return new Map([
          ...map,
          [
            type.shortname,
            { ...map.get(type.shortname), ...{ [name]: constraint } },
          ],
        ]);
      }

      return new Map([...map, [type.shortname, { [name]: constraint }]]);
    }, new Map<string, Scoring>());

    type.scoring = [...scorings.entries()];
    type.rubric_id = type.rubric?.rubric_id;

    delete type.rubric;

    return type;
  });

export const formatScores = (
  scores: ScoreModel[],
  types: ReaderTypeModel[]
): ScoreModel[] => {
  types = formatConstraints(types);

  return scores.map((model) => {
    const type = types.find((t) => t.rubric_id === model.rubric_id);

    if (type?.scoring) {
      const scoring =
        new Map<string, Scoring>(type.scoring).get(type.shortname) || {};

      let i = 1;
      model.score = [
        ...Object.keys(scoring).reduce((score, key) => {
          if (typeof model.score === "number") {
            score.set(key, Math.floor((model.score / i) % 10));
            i *= 10;
          }

          return score;
        }, new Map<string, number>()),
      ];
    }

    model.shortname = type?.shortname;

    return model;
  });
};

function validate(scoring: Scoring[string]) {
  let schema = number().required();

  if ("min" in scoring) schema = schema.min(scoring.min);
  if ("max" in scoring) schema = schema.max(scoring.max);

  return schema;
}

export const validateSchema = (
  scorings: ReaderTypeModel[]
): ObjectSchema<object | undefined> =>
  object().shape(
    scorings.reduce((schema, model) => {
      let scorings = {};
      if (model.scoring) {
        console.dir({ scorings: model.scoring }, { depth: null });
        for (const [key, scoring] of Object.entries<Scoring[string]>(
          // @ts-ignore
          model.scoring.get(model.shortname)
        )) {
          scorings = { ...scorings, [key]: validate(scoring) };
        }
      }

      return {
        ...schema,
        [model.shortname]: object().shape(scorings),
      };
    }, {})
  );
