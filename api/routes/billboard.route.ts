import { Router } from "express";
import {
  getBillboards,
  getBillboardById,
  createBillboard,
  updateBillboard,
  deleteBillboard,
} from "../controllers/billboard.controller";
import { protect } from "../middlewares/auth.middleware";
import { checkStoreOwner } from "../middlewares/storeOwner.middleware";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getBillboards)
  .post(protect, checkStoreOwner, createBillboard);
router
  .route("/:id")
  .get(getBillboardById)
  .put(protect, checkStoreOwner, updateBillboard)
  .delete(protect, checkStoreOwner, deleteBillboard);

export default router;
