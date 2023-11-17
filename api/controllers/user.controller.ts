import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { LoginCredentials, RegisterCredentials } from "@shared/user.document";
import { CookieName } from "@shared";
import { userService } from "../services/user.service";
import { throwError } from "../utils/error.utils";
import { User } from "../models/user.model";
import {
  createTokens,
  setTokens,
  clearTokens,
  verifyRefreshToken,
} from "../utils/token.utils";

export const register = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const credentials: RegisterCredentials = req.body;
      const { firstName, lastName, email, password } = credentials;
      if (!firstName || !lastName || !email || !password)
        return throwError(res, 400, "All fields are required");
      const user = await userService.createUser(credentials);
      if (!user) return throwError(res, 400, "User already exists");
      const { accessToken, refreshToken } = createTokens(user);
      const result = await userService.saveRefreshToken(user, refreshToken);
      if (!result) return throwError(res, 400, "Token cannot be saved");
      setTokens(res, accessToken, refreshToken);
      res.json(userService.responseUser(result));
    } catch (e: any) {
      throwError(res, 400, e.message ?? "Something went wrong");
    }
  }
);

export const login = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const credentials: LoginCredentials = req.body;
      const { email, password } = credentials;
      if (!email || !password)
        return throwError(res, 400, "All fields required");
      const authUser = await userService.authenticateUser(credentials);
      if (!authUser) return throwError(res, 400, "Invalid credentials");
      const { accessToken, refreshToken } = createTokens(authUser);
      const result = await userService.saveRefreshToken(authUser, refreshToken);
      if (!result) return throwError(res, 400, "Token cannot be saved");
      setTokens(res, accessToken, refreshToken);
      res.json(userService.responseUser(result));
    } catch (e: any) {
      throwError(res, 400, e.message ?? "Something went wrong");
    }
  }
);

export const refresh = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const currentRefreshToken = req.cookies[CookieName.RefreshToken];
    if (!currentRefreshToken) {
      clearTokens(res);
      return throwError(res, 401, "Unauthorized");
    }
    const isValidToken = verifyRefreshToken(currentRefreshToken);
    if (!isValidToken) {
      clearTokens(res);
      return throwError(res, 401, "Unauthorized");
    }
    try {
      const user: User = await userService.checkRefreshToken(
        isValidToken.userId,
        currentRefreshToken
      );
      if (!user) throw new Error("User not found");
      const { accessToken, refreshToken } = createTokens(user);

      if (isValidToken) {
        const result = await userService.saveRefreshToken(
          user,
          refreshToken,
          currentRefreshToken
        );
        if (!result) throw new Error("Token cannot be saved");
        setTokens(res, accessToken, refreshToken);

        res.json(userService.responseUser(result));
      } else {
        console.log("Invalid token detected.");
        return throwError(res, 401, "Invalid token");
      }
    } catch (e: any) {
      return throwError(res, 401, e.message ?? "Unauthorized");
    }
  }
);

export const logout = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const currentRefreshToken = req.cookies[CookieName.RefreshToken];
    if (!currentRefreshToken) return throwError(res, 401, "Unauthorized");
    const isValidToken = verifyRefreshToken(currentRefreshToken);
    if (!isValidToken) return throwError(res, 401, "Unauthorized");
    const user: User = await userService.checkRefreshToken(
      isValidToken.userId,
      currentRefreshToken
    );
    if (!user) return throwError(res, 401, "Unauthorized");
    const result = await userService.deleteRefreshToken(
      user.id,
      currentRefreshToken
    );
    if (!result) return throwError(res, 401, "Unauthorized");
    clearTokens(res);
    res.json({ message: "Logout successful" });
  }
);
