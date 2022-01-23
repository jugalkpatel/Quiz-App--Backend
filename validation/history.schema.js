import { string, array, object, number } from "yup";

const History = object({
  level: string().oneOf(["Rookie", "Skillful", "Expert"]).required(),
  score: number().required(),
  totalTime: number().required(),
});

export { History };
