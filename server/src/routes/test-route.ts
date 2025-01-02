import type { FastifyInstance } from "fastify";
import { TestRouteResponseSchema } from "@/schemas/routes/test-route-schema";

export async function TestRoute(app: FastifyInstance) {
  app.get(
    "/testing",
    {
      schema: {
        tags: ["example"],
        summary: "teste",
        description: "test description",
        response: {
          200: TestRouteResponseSchema.success,
          404: TestRouteResponseSchema.failed,
        },
      },
    },
    async (_, reply) => {
      return reply.status(200).send({ message: "Hello world!" });
    }
  );
}
