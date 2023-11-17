import * as z from "zod";
import { BaseAttributes } from "./index";
import { BillboardDocument } from "./billboard.document";

const CategoryCreateAttributes = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  billboardId: z.string().min(3).max(255),
});

const CategoryUpdateAttributes = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  billboardId: z.string().min(3).max(255),
});

const CategoryDocument = BaseAttributes.merge(
  z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    billboard: BillboardDocument,
  }),
);

type CategoryCreateAttributes = z.infer<typeof CategoryCreateAttributes>;
type CategoryUpdateAttributes = z.infer<typeof CategoryUpdateAttributes>;

type CategoryDocument = z.infer<typeof CategoryDocument>;

export { CategoryCreateAttributes, CategoryUpdateAttributes, CategoryDocument };
