import { object, string } from "yup";

export const schema = object().shape({
  username: string().required(),
  password: string().required(),
});
