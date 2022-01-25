export { registerService, loginService } from "./auth.services.js";
export { createPassword, validatePassword } from "./password.services.js";
export { createQuestion, getAllQuestions } from "./question.services.js";
export {
  createQuiz,
  getQuiz,
  addHistoryRecordInQuiz,
  getQuizLeaderBoard,
} from "./quiz.services.js";
export { createHistoryRecord } from "./history.services.js";
export {
  addHistoryRecordInUser,
  getUser,
  getUserHistory,
  updateUserLevel,
} from "./user.services.js";
