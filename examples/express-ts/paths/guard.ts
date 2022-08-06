import { z } from 'zod'
import { router } from '../router'

export const guard = router.path('/guard')

guard.handler({
	method: 'get',
	guard() {
		const rand = Math.random()
		return { pass: rand > 0.5, response: 'guarded' }
	},
	response: {
		200: z.string(),
	},
	resolver() {
		return {
			200: 'hello',
		}
	},
})
