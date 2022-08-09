import { z } from 'zod'
import { router } from '../router'

export const customContext = router.path('/custom-context')

customContext.handler({
	method: 'get',
	context: {
		message: 'hello',
	},
	response: {
		200: z.string(),
	},
	resolver({ ctx }) {
		const message = ctx.message ?? ''
		return {
			200: message,
		}
	},
})
