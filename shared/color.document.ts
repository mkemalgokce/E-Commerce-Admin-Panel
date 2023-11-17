import * as z from "zod";
import { BaseAttributes } from "./index";

const ColorCreateAttributes = z.object({
  name: z.string().min(3).max(255),
  hexCode: z.string().min(7).max(7).regex(/^#/, {
    message: "String must be a valid hex code",
  }),
});

const ColorUpdateAttributes = z.object({
  name: z.string().min(3).max(255),
  hexCode: z
    .string()
    .min(4)
    .max(9)
    .regex(/^#/, {
      message: "String must be a valid hex code",
    })
    .optional(),
});

const ColorDocument = BaseAttributes.merge(ColorCreateAttributes);

type ColorCreateAttributes = z.infer<typeof ColorCreateAttributes>;
type ColorUpdateAttributes = z.infer<typeof ColorUpdateAttributes>;
type ColorDocument = z.infer<typeof ColorDocument>;

export { ColorCreateAttributes, ColorUpdateAttributes, ColorDocument };
