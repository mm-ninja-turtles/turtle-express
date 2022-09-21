import { ResolverArgs, ResolverReturnType } from 'turtle-express'
import { z } from 'zod'
import { bookStatus } from '../../../configs/enum'
import { Book } from '../../../db/core-entities/books.schema'
import { deleteBookById } from '../../../services/book.service'

export const deleteBookParam = z.object({
	_id: z.string(),
})

export const deleteBookResponse = {
	200: Book,
	500: z.object({
		message: z.string(),
	}),
}

type deleteBookArgs = ResolverArgs<
	typeof deleteBookParam,
	unknown,
	unknown,
	'controlled'
>
type deleteBookReturn = ResolverReturnType<
	'controlled',
	typeof deleteBookResponse
>

export async function deleteBookResolver({
	ctx,
}: deleteBookArgs): Promise<deleteBookReturn> {
	const { _id } = ctx.params

	const book = await deleteBookById(_id)
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
