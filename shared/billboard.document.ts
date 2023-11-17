import * as z from "zod";
import { BaseAttributes } from "./index";

const BillboardCreateAttributes = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  image: z.string().min(3).max(255),
});

const BillboardUpdateAttributes = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  image: z.string().min(3).max(255).optional(),
});

const BillboardDocument = BaseAttributes.merge(BillboardCreateAttributes);
type BillboardCreateAttributes = z.infer<typeof BillboardCreateAttributes>;
type BillboardUpdateAttributes = z.infer<typeof BillboardUpdateAttributes>;
type BillboardDocument = z.infer<typeof BillboardDocument>;

export {
  BillboardCreateAttributes,
  BillboardUpdateAttributes,
  BillboardDocument,
};
