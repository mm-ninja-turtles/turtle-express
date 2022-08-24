import { z } from 'zod'
import { User } from '../../../db/entities/users.entity'

export const createUsersBody = z.object({
	name: z.string(),
	email: z.string().email(),
})

export const createUsersResponse = {
	200: User,
}

export function createUsersResolver() {
	return {}
}
