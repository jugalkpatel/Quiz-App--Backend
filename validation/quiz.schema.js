import { string, object } from "yup";

const Level = object({
  level: string().oneOf(["Rookie", "Skillful", "Expert"]),
});

export { Level };
