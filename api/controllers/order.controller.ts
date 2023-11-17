import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { orderService } from "../services/order.service";
import { OrderDocument } from "@shared/order.document";
import { throwError } from "../utils/error.utils";

const getAllOrders = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const orders: OrderDocument[] = await orderService.getAllOrders(
      req.params.storeId
    );
    res.json(orders);
  }
);

const getOrderById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const order = await orderService.getOrderById(
      req.params.id,
      req.params.storeId
    );
    if (order) throwError(res, 404, "Order not found");
    res.json(order);
  }
);

const createOrder = expressAsyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.body, req.params.storeId);
  res.json(order);
});

const updateOrder = expressAsyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.updateOrder(
    req.params.id,
    req.body,
    req.params.storeId
  );
  res.json(order);
});

const deleteOrder = expressAsyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.deleteOrder(
    req.params.id,
    req.params.storeId
  );
  res.json(order);
});

export { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };
