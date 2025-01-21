import z from "zod";
import { productSchema } from "./product-schema";
import { distributorSchema } from "./distributor-schema";

export const stockSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
  products: z.array(productSchema),
  distributor: distributorSchema,
});

export type Stock = z.infer<typeof stockSchema>;
