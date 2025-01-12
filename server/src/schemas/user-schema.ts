import z from "zod"

export enum Role {
  Admin = "Admin",
  User = "User",
}

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(Object.values(Role) as [Role, ...Role[]]), // Ensure it's a tuple of strings
  work: z.array(z.string().uuid()).optional(),
  ownedWork: z.array(z.string().uuid()).optional(),
});

export type User = z.infer<typeof userSchema>
