import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastify from "fastify"
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod"
import { TestRoute } from "@/routes/test-route"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "API de Exemplo",
			description: "Documentação da API de exemplo utilizando Fastify",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
})

app.register(TestRoute)

app
	.listen({ port: 3001 })
	.then(() => console.log("Server running on http://localhost:3001"))
