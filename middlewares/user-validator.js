import createError from "http-errors";
import { User } from "../models/index.js";
async function userValidator(req, res, next) {
  try {
    const userId = req.user;

    const user = await User.findById(userId);

    if (!user) {
      throw createError.Unauthorized("user not found");
    }

    req.user = user;

    console.log(req.user);

    return next();
  } catch (error) {
    next(error);
  }
}

export { userValidator };
