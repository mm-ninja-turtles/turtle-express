import { z } from 'zod'
import { router } from '../router'

export const fetchApi = router.path('/fetch-api')

fetchApi.handler({
	id: 'FetchApiExample',
	method: 'get',
	response: {
		200: z.any(),
	},
	async resolver() {
		const result = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
		return {
			200: await result.json(),
		}
	},
})
