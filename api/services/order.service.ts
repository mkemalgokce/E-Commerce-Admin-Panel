import { dataSource } from "../utils/db.utils";
import { Order } from "../models/order.model";
import { OrderUpdateAttributes } from "@shared/order.document";
// Get all orders
const getAllOrders = async (storeId: string) => {
  return await dataSource.manager.find(Order, {
    where: { storeId },
    relations: ["orderItems"],
  });
};

// Get order by id
const getOrderById = async (id: string, storeId: string) => {
  return await dataSource.manager.findOne(Order, {
    where: { id, storeId },
    relations: {
      orderItems: {
        product: true,
      },
    },
  });
};

// Create order
const createOrder = async (order: Order, storeId: string) => {
  const newOrder = dataSource.manager.create(Order, {
    ...order,
    store: {
      id: storeId,
    },
  });

  return await dataSource.manager.save(newOrder);
};

// Update order
const updateOrder = async (
  id: string,
  order: OrderUpdateAttributes,
  storeId: string,
) => {
  const result = await dataSource.manager.update(
    Order,
    { id, storeId },
    { ...order },
  );

  if (!result.affected) {
    throw new Error("Product not found");
  }
  return await getOrderById(id, storeId);
};

// Delete order
const deleteOrder = async (id: string, storeId: string) => {
  const result = await dataSource.manager.delete(Order, { id, storeId });
  if (!result.affected) {
    throw new Error("Order not found");
  }
  return true;
};

export const orderService = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
