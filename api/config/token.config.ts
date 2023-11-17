import { CookieConfig } from "shared";

enum TokenExpiration {
  ACCESS = "15m",
  REFRESH = "7d",
}

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "secret";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? "secret";

const defaultCookieConfig: CookieConfig = {
  httpOnly: true,
  maxAge: 60 * 60 * 1000,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  signed: false,
  sameSite: true,
};

const accessTokenCookieConfig: CookieConfig = {
  ...defaultCookieConfig,
  maxAge: 15 * 60 * 1000,
};

const refreshTokenCookieConfig: CookieConfig = {
  ...defaultCookieConfig,

  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export {
  TokenExpiration,
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenCookieConfig,
  refreshTokenCookieConfig,
  defaultCookieConfig,
};
