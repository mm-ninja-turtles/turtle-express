import { z } from 'zod'
import { router } from '../router'

export const requestValidation = router.path('/request-validation/:id')

requestValidation.handler({
	method: 'post',
	request: {
		params: z.object({
			id: z.string().transform((v) => parseInt(v)),
		}),
		query: z.object({
			limit: z
				.string()
				.default('10')
				.transform((v) => Number(v)),
		}),
		body: z.object({
			age: z.number(),
			dateOfBirth: z
				.string()
				.regex(/^\d\d\d\d-\d\d-\d\d$/g, {
					message:
						'dateOfBirth must be a valid date format string (YYYY-MM-DD).',
				})
				.transform((v) => new Date(v)),
		}),
	},
	response: {
		200: z.string(),
	},
	resolver({ ctx }) {
		const id = ctx.params?.id

		console.log(ctx.body)

		return {
			200: 'request validation id: ' + id + ' and type is: ' + typeof id,
		}
	},
})
