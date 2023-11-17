import { Router } from "express";
import storeRoute from "./store.route";
import categoryRoute from "./category.route";
import sizeRoute from "./size.route";
import colorRoute from "./color.route";
import productRoute from "./product.route";
import orderRoute from "./order.route";
import userRoute from "./user.route";
import uploadRoute from "./upload.route";
import billboardRoute from "./billboard.route";

const router = Router();

router.use("/user", userRoute);
router.use("/stores", storeRoute);
router.use("/upload", uploadRoute);

router.use("/:storeId/categories", categoryRoute);
router.use("/:storeId/sizes", sizeRoute);
router.use("/:storeId/colors", colorRoute);
router.use("/:storeId/products", productRoute);
router.use("/:storeId/orders", orderRoute);
router.use("/:storeId/billboards", billboardRoute);

export default router;
