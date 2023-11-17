import * as z from "zod";
import { BaseAttributes } from "./index";
import { CategoryDocument } from "./category.document";
import { StoreDocument } from "./store.document";
import { SizeDocument, SizeUpdateAttributes } from "./size.document";
import { ColorDocument } from "./color.document";

const ProductCreateAttributes = z.object({
  name: z.string().min(3).max(255),
  price: z.string().min(1).max(255),
  description: z.string().min(3).max(255),
  imageUrls: z.array(z.string().url()).min(1),
  categoryId: z.string().uuid(),
  colorId: z.string().uuid(),
  sizeId: z.string().uuid(),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
});

const ProductUpdateAttributes = ProductCreateAttributes.optional();

//Product document add

const ProductDocument = BaseAttributes.merge(ProductCreateAttributes).extend({
  category: CategoryDocument,
  size: SizeDocument,
  color: ColorDocument,
  store: StoreDocument,
});

type ProductCreateAttributes = z.infer<typeof ProductCreateAttributes>;
type ProductUpdateAttributes = z.infer<typeof ProductUpdateAttributes>;
type ProductDocument = z.infer<typeof ProductDocument>;

export { ProductCreateAttributes, ProductUpdateAttributes, ProductDocument };
