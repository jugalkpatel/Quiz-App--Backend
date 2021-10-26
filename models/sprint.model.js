import mongoose from "mongoose";

const { Schema, model } = mongoose;

const sprintSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  points: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
  },
});

const Sprint = model("Sprint", sprintSchema);

export { Sprint };
