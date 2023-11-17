import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { throwError } from "../utils/error.utils";
import { storeService } from "../services/store.service";

const checkStoreOwner = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    console.log("user", user);
    const storeId = req.params.storeId;
    if (!user || !storeId) throwError(res, 400, "Missing user or storeId");
    const store = await storeService.getStoreById(storeId, user.id);
    if (!store) throwError(res, 404, "Store not found");
    next();
  },
);

export { checkStoreOwner };
