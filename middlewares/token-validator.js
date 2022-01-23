import createError from "http-errors";

import { verifyAccessToken } from "../helpers/jwt.helpers.js";

async function tokenValidator(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw createError.BadRequest("empty token");
    }

    const { payload: accessTokenOwner, isExpired: isAccessTokenExpired } =
      verifyAccessToken(token);

    console.log({ accessTokenOwner, isAccessTokenExpired });

    if (!accessTokenOwner || isAccessTokenExpired) {
      throw createError.Unauthorized("Invalid Token");
    }

    req.userID = accessTokenOwner;
    return next();
  } catch (err) {
    next(err);
  }
}

export { tokenValidator };
