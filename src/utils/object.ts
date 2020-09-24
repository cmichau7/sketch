export const isObject = (arg: unknown): arg is Record<string, unknown> =>
  arg === Object(arg);

export const isEmpty = (obj: Record<string, unknown>): boolean =>
  obj == null || !(Object.keys(obj) || obj).length;
