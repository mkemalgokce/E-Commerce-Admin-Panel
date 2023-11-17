import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { checkStoreOwner } from "../middlewares/storeOwner.middleware";
import {
  getSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
} from "../controllers/size.controller";
const router = Router({ mergeParams: true });

router.route("/").get(getSizes).post(protect, checkStoreOwner, createSize);
router
  .route("/:id")
  .get(getSizeById)
  .put(protect, checkStoreOwner, updateSize)
  .delete(protect, checkStoreOwner, deleteSize);
export default router;
