import { string, object } from "yup";
const Quiz = object({
  quizType: string().oneOf(["Rookie", "SkillFul", "Expert"]).required(),
});

export { Quiz };
