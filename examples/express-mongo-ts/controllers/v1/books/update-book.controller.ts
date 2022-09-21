import { ResolverArgs, ResolverReturnType } from 'turtle-express'
import { z } from 'zod'
import { bookStatus } from '../../../configs/enum'
import { Book } from '../../../db/core-entities/books.schema'
import { updateBook } from '../../../services/book.service'
import { getBookParam } from './get-book.controller'

export const updateBookBody = Book.omit({ _id: true })

export const updateBookResponse = {
	200: Book,
	400: z.object({
		message: z.string(),
	}),
	500: z.object({
		message: z.string(),
	}),
}

type updateBookArgs = ResolverArgs<
	typeof getBookParam,
	unknown,
	typeof updateBookBody,
	'controlled'
>
type updateBookReturn = ResolverReturnType<
	'controlled',
	typeof updateBookResponse
>

export async function updateBookResolver({
	ctx,
}: updateBookArgs): Promise<updateBookReturn> {
	const { _id } = ctx.params
	const { name, description, status } = ctx.body

	const book = await updateBook({ _id, name, description, status })
	if (book) {
		return {
			200: {
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
