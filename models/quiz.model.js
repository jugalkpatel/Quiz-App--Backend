import mongoose from "mongoose";

const { Schema, model } = mongoose;

const quizSchema = Schema({
  quizType: {
    type: String,
    required: true,
    enum: ["Rookie", "SkillFul", "Expert"],
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  leaderBoard: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Quiz = model("Quiz", quizSchema);

export { Quiz };
