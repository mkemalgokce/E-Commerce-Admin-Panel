import * as z from "zod";
import { BaseAttributes } from "./index";

const SizeCreateAttributes = z.object({
  name: z.string().min(3).max(255),
  value: z.string().min(1).max(255),
});

const SizeUpdateAttributes = z.object({
  name: z.string().min(3).max(255).optional(),
  value: z.string().min(3).max(255).optional(),
});

const SizeDocument = BaseAttributes.merge(SizeCreateAttributes);

type SizeCreateAttributes = z.infer<typeof SizeCreateAttributes>;
type SizeUpdateAttributes = z.infer<typeof SizeUpdateAttributes>;
type SizeDocument = z.infer<typeof SizeDocument>;
export { SizeCreateAttributes, SizeUpdateAttributes, SizeDocument };
