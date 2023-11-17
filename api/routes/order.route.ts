import { Router } from "express";

import { protect } from "../middlewares/auth.middleware";
import { checkStoreOwner } from "../middlewares/storeOwner.middleware";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";

const router = Router({ mergeParams: true });


router
  .route("/")
  .get(protect, checkStoreOwner, getAllOrders)
  .post(protect, createOrder);

router
  .route("/:id")
  .get(protect, checkStoreOwner, getOrderById)
  .put(protect, checkStoreOwner, updateOrder)
  .delete(protect, checkStoreOwner, deleteOrder);

export default router;
