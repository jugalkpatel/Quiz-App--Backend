import { string, object } from "yup";

const Level = object({
  level: string()
    .oneOf(["Rookie", "Skillful", "Expert"])
    .required("level is required"),
});

export { Level };
