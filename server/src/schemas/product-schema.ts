import z from "zod"
import { categorySchema } from "./category-schema";
import { batchSchema } from "./batch-schema";

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  categories: z.array(categorySchema),
  batches: z.array(batchSchema),
  // stock: stockSchema
  stockId: z.string().uuid()
});

export type Product = z.infer<typeof productSchema>
