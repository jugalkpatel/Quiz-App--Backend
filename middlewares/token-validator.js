import createError from "http-errors";

import { verifyAccessToken } from "../helpers/jwt.helpers.js";

async function tokenValidator(req, res, next) {
  try {
    // const { accessToken, refreshToken } = req.cookies;

    const token = req.headers.authorization;

    if (!token) {
      throw createError.BadRequest("empty token");
    }

    // if (!accessToken || !refreshToken) {
    //   throw createError.BadRequest("Empty tokens");
    // }

    const { payload: accessTokenOwner, isExpired: isAccessTokenExpired } =
      verifyAccessToken(token);

    console.log({ accessTokenOwner, isAccessTokenExpired });

    if (!accessTokenOwner || isAccessTokenExpired) {
      throw createError.Unauthorized("Invalid Token");
    }

    // if (accessTokenOwner && !isAccessTokenExpired) {
    //   req.user = accessTokenOwner;
    //   return next();
    // }

    req.user = accessTokenOwner;
    return next();

    // const { payload: refreshTokenOwner, isExpired: isRefreshTokenExpired } =
    //   verifyRefreshToken(refreshToken);

    // console.log({ refreshTokenOwner, isRefreshTokenExpired });

    // if (!refreshTokenOwner || isRefreshTokenExpired) {
    //   deleteCookies(res);

    //   throw createError.Forbidden("Token Expired");
    // }

    // const newAccessToken = await getAccessToken(refreshTokenOwner);

    // const newRefreshToken = await getRefreshToken(refreshTokenOwner);

    // res.cookie("accessToken", newAccessToken, {
    //   maxAge: 300000,
    //   httpOnly: true,
    // });

    // res.cookie("refreshToken", newRefreshToken, {
    //   maxAge: new Date(Date.now() + 365 * 86400000),
    //   httpOnly: true,
    // });

    // req.user = refreshTokenOwner;
  } catch (err) {
    next(err);
  }
}

export { tokenValidator };
