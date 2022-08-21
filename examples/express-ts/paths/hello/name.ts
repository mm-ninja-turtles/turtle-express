import { z } from 'zod'
import { hello } from '.'

export const helloName = hello.path('/:name')

helloName.handler({
	method: 'get',
	request: {
		params: z.object({
			name: z.string(),
		}),
	},
	response: {
		200: z.string(),
	},
	resolver({ ctx }) {
		const name = ctx.params?.name

		return {
			200: `Hello ${name}!`,
		}
	},
})
