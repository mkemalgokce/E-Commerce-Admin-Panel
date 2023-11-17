import jwt from "jsonwebtoken";
import { Response } from "express";
import { isProduction } from "../config";
import {
  accessTokenSecret,
  refreshTokenSecret,
  TokenExpiration,
  accessTokenCookieConfig,
  defaultCookieConfig,
  refreshTokenCookieConfig,
} from "../config/token.config";

import { UserDocument } from "@shared/user.document";
import { AccessTokenPayload, RefreshTokenPayload, CookieName } from "@shared";

const createAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, accessTokenSecret, {
    expiresIn: TokenExpiration.ACCESS,
  });
};

const createRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(payload, refreshTokenSecret, {
    expiresIn: TokenExpiration.REFRESH,
  });
};

const setTokenToCookie = (res: any, token: string, cookieName: CookieName) => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    path: "/api",
    sameSite: isProduction ? "strict" : "lax",
    secure: isProduction,
  });
};

export const createTokens = (user: UserDocument) => {
  const accessPayload: AccessTokenPayload = { userId: user.id };
  const refreshPayload: RefreshTokenPayload = {
    userId: user.id,
  };

  const accessToken = createAccessToken(accessPayload);
  const refreshToken = refreshPayload && createRefreshToken(refreshPayload);

  console.log("Tokens: ", accessToken, refreshToken);
  return { accessToken, refreshToken };
};

export const setTokens = (res: Response, access: string, refresh?: string) => {
  res.cookie(CookieName.AccessToken, access, accessTokenCookieConfig);
  if (refresh)
    res.cookie(CookieName.RefreshToken, refresh, refreshTokenCookieConfig);
};

export const clearTokens = (res: Response) => {
  res.cookie(CookieName.AccessToken, "", {
    ...defaultCookieConfig,
    maxAge: 0,
  });
  res.cookie(CookieName.RefreshToken, "", {
    ...defaultCookieConfig,
    maxAge: 0,
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, accessTokenSecret) as AccessTokenPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret) as RefreshTokenPayload;
};
