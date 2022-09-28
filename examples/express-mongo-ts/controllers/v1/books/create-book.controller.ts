import { ResolverArgs, ResolverReturnType } from 'turtle-express'
import { z } from 'zod'
import { bookStatus } from '../../../configs/enum'
import { Book } from '../../../db/core-entities/books.schema'
import { createBook } from '../../../services/book.service'

export const createBookBody = Book.omit({ _id: true })

export const createBookResponse = {
	201: Book,
	400: z.object({
		message: z.string(),
	}),
	500: z.object({
		message: z.string(),
	}),
}

type createBookArgs = ResolverArgs<
	unknown,
	unknown,
	typeof createBookBody,
	'controlled'
>
type createBookReturn = ResolverReturnType<
	'controlled',
	typeof createBookResponse
>

export async function createBookResolver({
	ctx,
}: createBookArgs): Promise<createBookReturn> {
	const { name, description, status } = ctx.body

	const book = await createBook({ name, description, status })

	if (book) {
		return {
			201: {
				_id: book._id.toString(),
				name: book.name,
				status: book.status as typeof bookStatus[number],
				description: book.description || '',
				createdAt: book.createdAt,
				updatedAt: book.updatedAt,
			},
		}
	} else {
		return { 500: { message: 'Unknown Error' } }
	}
}
