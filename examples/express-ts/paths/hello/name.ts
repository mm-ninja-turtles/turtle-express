import { z } from 'zod'
import { hello } from '.'

export const helloName = hello.path('/:name')

helloName.handler({
	method: 'get',
	response: {
		200: z.string(),
	},
	resolver() {
		return {
			200: 'Hello Name!',
		}
	},
})
