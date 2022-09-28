import {
	getPagination,
	paginationSchema,
	ResolverArgs,
	ResolverReturnType,
} from 'turtle-express'
import { z } from 'zod'
import { bookStatus } from '../../../configs/enum'
import { Book } from '../../../db/core-entities/books.schema'
import { fillAllBooks } from '../../../services/book.service'

export const getBooksQuery = z.object({
	limit: z
		.string()
		.default('10')
		.transform((v) => Number(v)),
	page: z
		.string()
		.default('1')
		.transform((v) => Number(v) - 1),
})

export const getBooksResponse = {
	200: z.object({
		books: z.array(Book),
		pagination: paginationSchema,
	}),
	404: z.object({
		message: z.string(),
	}),
}

type getBooksArgs = ResolverArgs<
	unknown,
	typeof getBooksQuery,
	unknown,
	'controlled'
>

type getBooksReturn = ResolverReturnType<'controlled', typeof getBooksResponse>

export async function getBooksResolver({
	ctx,
}: getBooksArgs): Promise<getBooksReturn> {
	const { limit, page } = ctx.query

	const { books, count } = await fillAllBooks(limit, page)

	if (books) {
		return {
			200: {
				books: books.map((book) => ({
					_id: book._id.toString(),
					name: book.name,
					status: book.status as typeof bookStatus[number],
					description: book.description || '',
					createdAt: book.createdAt,
					updatedAt: book.updatedAt,
					deletedAt: book.deletedAt,
				})),
				pagination: getPagination({ limit, page: page + 1, totalCount: count }),
			},
		}
	} else {
		return { 404: { message: 'Users Not Found' } }
	}
}
