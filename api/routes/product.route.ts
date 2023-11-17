import { Router } from "express";
import {
  getProductById,
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";
import { checkStoreOwner } from "../middlewares/storeOwner.middleware";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getProducts)
  .post(protect, checkStoreOwner, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, checkStoreOwner, updateProduct)
  .delete(protect, checkStoreOwner, deleteProduct);

export default router;
