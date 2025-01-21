import z from "zod"
import { productSchema } from "./product-schema";
import { orderSchema } from "./order-schema";

export const batchSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
  total: z.number(),
  products: z.array(productSchema),
  manufactureDate: z.date(),
  expireDate: z.date(),
  orders: z.array(orderSchema),
});

export type Batch = z.infer<typeof batchSchema>
