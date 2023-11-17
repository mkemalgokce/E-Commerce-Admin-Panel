import {
  fetcher,
  patcher,
  poster,
  putter,
  deleter
} from "@/lib/request.utils.ts"
import { OrderDocument } from "@shared/order.document.ts"

// Fetch all orders
export const getOrders = async (storeId: string): Promise<OrderDocument[]> => {
  const [error, products] = await fetcher<OrderDocument[]>(`${storeId}/orders`)
  if (error) throw error
  if (!products) throw new Error("Orders not found")
  return products
}

// Fetch an order by id
export const getOrder = async (
  storeId: string,
  id: string
): Promise<OrderDocument> => {
  const [error, product] = await fetcher<OrderDocument>(
    `${storeId}/orders/${id}`
  )
  if (error) throw error
  if (!product) throw new Error("Order not found")
  return product
}

// Create an order
export const createOrder = async (
  order: OrderDocument,
  storeId: string
): Promise<OrderDocument> => {
  const [error, createdOrder] = await poster<OrderDocument>(
    `${storeId}/orders`,
    order
  )
  if (error) throw error
  if (!createdOrder) throw new Error("Order not created")
  return createdOrder
}

// Update an order
export const updateOrder = async (
  data: OrderDocument,
  id: string,
  storeId: string
): Promise<OrderDocument> => {
  const [error, order] = await putter<OrderDocument>(
    `${storeId}/orders/${id}`,
    data
  )
  if (error) throw error
  if (!order) throw new Error("Order not updated")
  return order
}

// Delete an order
export const deleteOrder = async (
  id: string,
  storeId: string
): Promise<boolean> => {
  const [error, order] = await deleter<boolean>(`${storeId}/orders/${id}`)
  if (error) throw error
  if (!order) throw new Error("Order not deleted")
  return order
}
