import { z } from 'zod'
import { getPagination, paginationSchema } from 'turtle-express'
import { router } from '../router'

export const paginationTest = router.path('/pagination-test')

paginationTest.handler({
	method: 'get',
	request: {
		query: z.object({
			limit: z
				.string()
				.default('10')
				.transform((v) => Number(v)),
			page: z
				.string()
				.default('1')
				.transform((v) => Number(v)),
		}),
	},
	response: {
		200: paginationSchema,
	},
	resolver({ ctx }) {
		const { limit, page } = ctx.query
		return {
			200: getPagination({ limit, page, totalCount: 341 }),
		}
	},
})
