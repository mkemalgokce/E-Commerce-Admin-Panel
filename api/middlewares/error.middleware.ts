import { Request, Response, NextFunction } from "express";
import { isProduction } from "../config";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  const responseBody = {
    message: err.message,
    stack: isProduction ? null : err.stack,
  };
  res.status(statusCode).json(responseBody);
};

export default errorMiddleware;
