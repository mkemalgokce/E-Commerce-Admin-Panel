import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
const notFoundMiddleware = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  }
);

export default notFoundMiddleware;
