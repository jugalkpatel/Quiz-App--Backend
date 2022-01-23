import createError from "http-errors";

import { History } from ".././models/index.js";

async function createHistoryRecord({ user, level, score, time }) {
  const historyRecord = await History.create({
    user,
    quiz: level,
    score,
    totalTime: time,
  });

  if (!historyRecord) {
    throw createError.InternalServerError("Failed to create history record");
  }

  return historyRecord;
}

export { createHistoryRecord };
