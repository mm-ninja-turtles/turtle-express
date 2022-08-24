import { ResolverArgs, ResolverReturnType } from 'turtle-express'
import { z } from 'zod'
import { findAllUsers } from '../../../services/users/users.model'

export const findAllUsersQuery = z.object({
	limit: z
		.string()
		.default('10')
		.transform((v) => Number(v)),
	page: z
		.string()
		.default('1')
		.transform((v) => Number(v)),
})

export const findAllUsersResponse = {
	200: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
		}),
	),
}

type Args = ResolverArgs<
	unknown,
	typeof findAllUsersQuery,
	unknown,
	'controlled'
>
type Return = ResolverReturnType<'controlled', typeof findAllUsersResponse>

export async function findAllUsersResolver({ ctx }: Args): Promise<Return> {
	// const { limit, page } = ctx.query

	findAllUsers()

	return {
		200: [{ id: '', name: '' }],
	}
}
