import mongoose from 'mongoose'
import { z } from 'zod'
import { bookStatus } from '../../configs/enum'

const BookSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: bookStatus[0],
			enum: bookStatus,
		},
		description: {
			type: String,
			required: false,
		},
		deletedAt: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: true },
)

export const BookModel = mongoose.model('Book', BookSchema)

export const Book = z.object({
	_id: z.string(),
	name: z.string(),
	status: z.enum(bookStatus).default(bookStatus[0]),
	description: z.string(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
	deletedAt: z.date().optional(),
})
