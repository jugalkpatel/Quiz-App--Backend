import mongoose from "mongoose";

const { Schema, model } = mongoose;

const QuestionSchema = Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  questionType: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
  },
});

const Question = model("Question", QuestionSchema);

export { Question };
