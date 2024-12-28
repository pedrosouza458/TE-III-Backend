import z from "zod"

export const userSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	work: z.array(z.string().uuid()).optional(),
	ownedWork: z.array(z.string().uuid()).optional(),
})

export type User = z.infer<typeof userSchema>
