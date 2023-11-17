import { Router } from "express";
import {
  createStore,
  getStores,
  getFirstStore,
  getStoreById,
  updateStore,
  deleteStore,
} from "../controllers/store.controller";
import { protect } from "../middlewares/auth.middleware";
import { checkStoreOwner } from "../middlewares/storeOwner.middleware";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(protect, getStores)
  .post(protect, checkStoreOwner, createStore);
router.get("/first", protect, getFirstStore);
router
  .route("/:storeId")
  .get(protect, checkStoreOwner, getStoreById)
  .put(protect, checkStoreOwner, updateStore)
  .delete(protect, checkStoreOwner, deleteStore);

export default router;
