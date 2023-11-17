import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../controllers/category.controller";
import { protect } from "../middlewares/auth.middleware";
import { checkStoreOwner } from "../middlewares/storeOwner.middleware";
const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getCategories)
  .post(protect, checkStoreOwner, createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(protect, checkStoreOwner, updateCategory)
  .delete(protect, checkStoreOwner, deleteCategory);

export default router;
