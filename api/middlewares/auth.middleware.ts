import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { CookieName } from "@shared";
import { verifyAccessToken } from "../utils/token.utils";
import { throwError } from "../utils/error.utils";
import { userService } from "../services/user.service";

//Protect middleware
const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = verifyAccessToken(req.cookies[CookieName.AccessToken]);

    if (!token) return throwError(res, 401, "Unauthorized");
    req.body.user = await userService.getUserById(token.userId);

    return next();
  },
);

export { protect };
