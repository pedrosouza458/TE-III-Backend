import z from "zod"
import { userSchema } from "./user-schema";
import { distributorSchema } from "./distributor-schema";
import { batchSchema } from "./batch-schema";

export const orderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  user: userSchema,
  userId: z.string().uuid(),
  distributor: distributorSchema,
  distributorId: z.string().uuid(),
  approvedByAdmin: userSchema,
  approvedByAdminId: z.string().uuid(),
  batches: z.array(batchSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Order = z.infer<typeof orderSchema>
