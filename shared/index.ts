import * as z from "zod";
export interface BaseAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const BaseAttributes = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

//Tokens and cookies config

export const enum CookieName {
  AccessToken = "access-token",
  RefreshToken = "refresh-token",
}

export interface AccessTokenPayload {
  userId: string;
}

export interface RefreshTokenPayload {
  userId: string;
}
export interface CookieConfig {
  httpOnly: boolean;
  path: string;
  sameSite: boolean;
  secure: boolean;
  maxAge: number;
  signed: boolean;
}
