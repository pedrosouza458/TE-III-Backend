import z from "zod"
import { userSchema } from "./user-schema";
import { orderSchema } from "./order-schema";

export enum Status {
  Rejected = "Rejected",
  Pending = "Pending",
  Approved = "Approved"
}

export const distributorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  status : z.enum(Object.values(Status) as [Status, ...Status[]]),
  stock: z.number(),
  stockId: z.string().uuid(),
  selledProducts: z.number(),
  users: z.array(userSchema),
  orders: z.array(orderSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Distributor = z.infer<typeof distributorSchema>
