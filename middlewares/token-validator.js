import createError from "http-errors";

import {
  getAccessToken,
  getRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../helpers/jwt.helpers.js";
import { deleteCookies } from "../utils/deleteCookies.js";

async function tokenValidator(req, res, next) {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      throw createError.BadRequest("Empty tokens");
    }

    console.log("Access Token", accessToken);
    console.log("Refresh Token", refreshToken);

    const { payload: accessTokenOwner, isExpired: isAccessTokenExpired } =
      verifyAccessToken(accessToken);

    console.log({ accessTokenOwner, isAccessTokenExpired });

    if (accessTokenOwner && !isAccessTokenExpired) {
      req.user = accessTokenOwner;
      return next();
    }

    const { payload: refreshTokenOwner, isExpired: isRefreshTokenExpired } =
      verifyRefreshToken(refreshToken);

    console.log({ refreshTokenOwner, isRefreshTokenExpired });

    if (!refreshTokenOwner || isRefreshTokenExpired) {
      deleteCookies(res);

      throw createError.Forbidden("Token Expired");
    }

    const newAccessToken = await getAccessToken(refreshTokenOwner);

    const newRefreshToken = await getRefreshToken(refreshTokenOwner);

    res.cookie("accessToken", newAccessToken, {
      maxAge: 300000,
      httpOnly: true,
    });

    res.cookie("refreshToken", newRefreshToken, {
      maxAge: new Date(Date.now() + 365 * 86400000),
      httpOnly: true,
    });

    req.user = refreshTokenOwner;

    return next();
  } catch (err) {
    next(err);
  }
}

export { tokenValidator };
