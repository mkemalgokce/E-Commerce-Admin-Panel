import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { checkStoreOwner } from "../middlewares/storeOwner.middleware";
import {
  getColorById,
  deleteColor,
  getColors,
  createColor,
  updateColor,
} from "../controllers/color.controller";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(protect, checkStoreOwner, getColors)
  .post(protect, checkStoreOwner, createColor);

router
  .route("/:id")
  .get(protect, checkStoreOwner, getColorById)
  .put(protect, checkStoreOwner, updateColor)
  .delete(protect, checkStoreOwner, deleteColor);

export default router;
