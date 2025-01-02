# Pasta Routes
### cada rota deve conter o Schema relacionado a sua rota
## Exemplo rota

cada rota é um arquivo separado, que tem de ser uma função asíncrona com o parametro FastifyIstance

```js
import type { FastifyInstance } from "fastify";
import { TestRouteResponseSchema } from "@/schemas/routes/test-route-schema";

export async function TestRoute(app: FastifyInstance) {
  app.get(
    // get é o método
    "/testing", // nome da rota
    {
      schema: {
        // descrição para o Swagger interpretar e gerar o docs
        tags: ["example"], // grupo de rota
        summary: "teste", // explicação
        description: "test description", // descrição
        response: {
          200: TestRouteResponseSchema.success, // schema de resposta caso o status code seja 200
          404: TestRouteResponseSchema.failed, // schema de resposta caso o status code seja 404, como é um internal server error todas as rotas terão ele
        },
      },
    },
    async (_, reply) => {
      // async pode receber req (request) e reply
      return reply.status(200).send({ message: "Hello world!" }); // a resposta tem que ser compatível com o schema (no caso 200)
    }
  );
}
```

## Exemplo de schema para rotas:

```js
import z from "zod"

export const TestRouteResponseSchema = {
  // Criei um objeto para conter mais de um tipo de resposta diferente
  // Em exemplos mais complexos como envio de lista de produtos, o uso de tipos para rotas vai ser melhor aproveitado
	success: z.object({ // o nome não importa pois no schema das rotas vai ter de ser escrito o status code relacionado ao schema
		message: z.string(),
	}),
	failed: z.object({ // eu criei success e failed por semântica apenas, pode ser criado só um objeto message
		message: z.string(),
	}),
}
```