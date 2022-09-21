import { z } from 'zod'
import { Book, BookModel } from '../db/core-entities/books.schema'

export async function fillAllBooks(limit: number, page: number) {
	const books = (await BookModel.find()
		.limit(limit)
		.skip((limit - 1) * page)) as unknown as z.infer<typeof Book>[]
	const count = await BookModel.find().count()
	return { books, count }
}

export async function createBook(dto: Omit<z.infer<typeof Book>, '_id'>) {
	const newBook = new BookModel({
		name: dto.name,
		status: dto.status,
		description: dto.description,
	})
	return (await newBook.save()) as unknown as z.infer<typeof Book>
}

export async function findBookById(id: string) {
	return (await BookModel.findById(id)) as unknown as z.infer<typeof Book>
}

export async function updateBook(dto: z.infer<typeof Book>) {
	const { _id, name, status, description } = dto

	return (await BookModel.findOneAndUpdate(
		{ _id },
		{
			name,
			status,
			description,
		},
		{
			new: true,
		},
	)) as unknown as z.infer<typeof Book>
}

export async function deleteBookById(id: string) {
	return (await BookModel.findByIdAndDelete(id)) as unknown as z.infer<
		typeof Book
	>
}
