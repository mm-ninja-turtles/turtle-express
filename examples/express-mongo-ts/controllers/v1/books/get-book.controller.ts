import { ResolverArgs, ResolverReturnType } from 'turtle-express'
import { z } from 'zod'
import { bookStatus } from '../../../configs/enum'
import { Book } from '../../../db/core-entities/books.schema'
import { findBookById } from '../../../services/book.service'

export const getBookParam = z.object({
	_id: z.string(),
})

export const getBookResponse = {
	200: Book,
	400: z.object({
		message: z.string(),
	}),
}

type getBookArgs = ResolverArgs<
	typeof getBookParam,
	unknown,
	unknown,
	'controlled'
>
type getBookReturn = ResolverReturnType<'controlled', typeof getBookResponse>

export async function getBookResolver({
	ctx,
}: getBookArgs): Promise<getBookReturn> {
	const { _id } = ctx.params
	const book = await findBookById(_id)
	if (book) {
		return {
			200: {
				_id: book._id.toString(),
				name: book.name,
				status: book.status as typeof bookStatus[number],
				description: book.description || '',
				createdAt: book.createdAt,
				updatedAt: book.updatedAt,
				deletedAt: book.deletedAt,
			},
		}
	} else {
		return { 400: { message: 'Book Not Found' } }
	}
}
