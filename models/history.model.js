import mongoose from "mongoose";

const { Schema, model } = mongoose;

const historySchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
  },
  score: {
    type: Number,
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
});

const History = model("History", historySchema);

export { History };
