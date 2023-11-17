import * as z from "zod";
import { BaseAttributes } from "./index";
import { ProductDocument } from "./product.document";

const OrderItemCreateAttributes = z.object({
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductDocument,
});

const OrderItemUpdateAttributes = OrderItemCreateAttributes.optional();
const OrderItemDocument = BaseAttributes.merge(OrderItemCreateAttributes);

type OrderItemCreateAttributes = z.infer<typeof OrderItemCreateAttributes>;
type OrderItemUpdateAttributes = z.infer<typeof OrderItemUpdateAttributes>;
type OrderItemDocument = z.infer<typeof OrderItemDocument>;

const OrderCreateAttributes = z.object({
  storeId: z.string().uuid(),
  isPaid: z.boolean(),
  address: z.string().min(3).max(255),
  phone: z.string().min(3).max(255),
  orderItems: z.array(OrderItemDocument),
});

const OrderUpdateAttributes = OrderCreateAttributes.optional();

const OrderDocument = BaseAttributes.merge(OrderCreateAttributes);
type OrderCreateAttributes = z.infer<typeof OrderCreateAttributes>;
type OrderUpdateAttributes = z.infer<typeof OrderUpdateAttributes>;
type OrderDocument = z.infer<typeof OrderDocument>;

export {
  OrderCreateAttributes,
  OrderUpdateAttributes,
  OrderDocument,
  OrderItemCreateAttributes,
  OrderItemUpdateAttributes,
  OrderItemDocument,
};
