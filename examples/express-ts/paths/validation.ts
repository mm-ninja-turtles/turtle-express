import { z } from 'zod'
import { router } from '../router'

export const validation = router.path('/validation')

validation.handler({
	method: 'get',
	response: {
		200: z.object({
			email: z.string().email(),
			password: z.number(),
		}),
	},
	resolver() {
		return {
			200: {
				email: 'joshua@gmail',
				password: 123,
			},
		}
	},
})
