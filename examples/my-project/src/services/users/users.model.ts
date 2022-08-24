import { z } from 'zod'
import { UserSchema } from '../../controllers/v1/users/create-users.controller'

export function findAllUsers() {
	return []
}

export function createUser(dto: z.infer<typeof UserSchema>) {
	return {}
}
