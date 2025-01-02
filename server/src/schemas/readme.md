## Pasta Schema (src)
### serve pra criar os schemas (tipagem) das entidades
## Exemplo:

```js
import z from "zod"

export const exampleSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
})

export type Example = z.infer<typeof exampleSchema>

```