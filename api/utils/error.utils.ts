import { Response } from "express";
const throwError = (
  res: Response,
  errorCode: number,
  errorMessage?: string,
) => {
  res.status(errorCode);
  throw Error(errorMessage ?? "Something went wrong!");
};

export { throwError };
