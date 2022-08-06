import { z } from 'zod'
import { router } from '../../router'

export const hello = router.path('/hello')

hello.handler({
	method: 'get',
	response: {
		200: z.string(),
	},
	resolver() {
		return { 200: 'Hello' }
	},
})

hello.handler({
	method: 'post',
	response: {
		200: z.object({
			age: z.number(),
		}),
		400: z.object({
			message: z.string(),
		}),
	},
	resolver() {
		const rand = Math.random()

		// 50% chance of responding 400
		if (rand > 0.5)
			return {
				400: { message: 'Bad Request' },
			}

		return {
			200: { age: 20 },
		}
	},
})
