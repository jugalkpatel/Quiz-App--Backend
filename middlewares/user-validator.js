import createError from "http-errors";

import { User } from "../models/index.js";

async function userValidator(req, res, next) {
  try {
    const userID = req.userID;

    const user = await User.findById(userID);

    if (!user) {
      throw createError.Unauthorized("user not found");
    }

    req.user = user;

    return next();
  } catch (error) {
    next(error);
  }
}

export { userValidator };
