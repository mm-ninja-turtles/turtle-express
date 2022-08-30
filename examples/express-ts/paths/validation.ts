import { z } from 'zod'
import { router } from '../router'

export const validation = router.path('/validation/:code')

validation.handler({
	id: 'Validation',
	method: 'post',
	request: {
		params: z.object({
			code: z.string().min(1, { message: 'code is required.' }),
		}),
		query: z.object({
			limit: z
				.string()
				.min(1, { message: 'limit is required.' })
				.transform((v) => Number(v)),
		}),
		body: z.object({
			email: z.string().email({ message: 'wrong email pattern.' }),
		}),
	},
	response: {
		200: z.object({
			email: z.string().email(),
			password: z.number(),
		}),
	},
	resolver({ ctx }) {
		const { code } = ctx.params
		const { limit } = ctx.query
		const { email } = ctx.body

		console.log({ code, limit })

		return {
			200: {
				email,
				password: 123,
			},
		}
	},
})
