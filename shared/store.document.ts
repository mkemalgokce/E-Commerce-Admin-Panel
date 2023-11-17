import * as z from "zod";
import { BaseAttributes } from "./index";

const StoreCreateAttributes = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

const StoreUpdateAttributes = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
});

const StoreDocument = BaseAttributes.merge(StoreCreateAttributes);
type StoreCreateAttributes = z.infer<typeof StoreCreateAttributes>;
type StoreUpdateAttributes = z.infer<typeof StoreUpdateAttributes>;

type StoreDocument = z.infer<typeof StoreDocument>;
export { StoreCreateAttributes, StoreUpdateAttributes, StoreDocument };
