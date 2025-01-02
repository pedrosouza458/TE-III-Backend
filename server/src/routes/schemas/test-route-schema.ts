import z from "zod"

export const TestRouteResponseSchema = {
	success: z.object({
		message: z.string(),
	}),
	failed: z.object({
		message: z.string(),
	}),
}
