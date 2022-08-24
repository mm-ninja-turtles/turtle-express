import { z } from 'zod'

//
export const User = z.object({
	_id: z.string(),
	name: z.string(),
	email: z.string().email({ message: 'Wrong email.' }),
	password: z.string(),
})

// export const UserModel
