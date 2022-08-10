import { z } from 'zod'

export interface GetPaginationArgs {
	totalCount: number
	limit: number
	page: number
}

export const paginationSchema = z.object({
	firstPage: z.number(),
	totalPages: z.number(),
	currentPage: z.number(),
	previousPage: z.number(),
	nextPage: z.number(),
	currentOffset: z.number(),
	previousOffset: z.number(),
	nextOffset: z.number(),
	lastOffset: z.number(),
	firstOffset: z.number(),
})

export type GetPaginationReturnType = z.infer<typeof paginationSchema>

export function getPagination({
	page,
	limit,
	totalCount,
}: GetPaginationArgs): GetPaginationReturnType {
	// calculate total pages
	const totalPages = Math.ceil(totalCount / limit)

	// calculate current page
	let currentPage = page
	// ensure current page isn't out of range
	if (currentPage < 1) currentPage = 1
	else if (currentPage > totalPages) currentPage = totalPages

	// calculate previous page
	let previousPage = currentPage - 1
	if (previousPage < 1) previousPage = 1

	// calculate next page
	let nextPage = currentPage + 1
	if (nextPage > totalPages) nextPage = totalPages

	// calculate current offset
	let currentOffset = (currentPage - 1) * limit
	// ensure current offset isn't out of range
	if (currentOffset < 0) currentOffset = 0
	else if (currentOffset > totalCount) currentOffset = totalCount - 1

	// calculate previous offset
	let previousOffset = (previousPage - 1) * limit
	if (previousOffset < 0) previousOffset = 0
	else if (previousOffset > totalCount) previousOffset = totalCount - 1

	// calculate next offset
	let nextOffset = (nextPage - 1) * limit
	if (nextOffset < 0) nextOffset = 0
	else if (nextOffset > totalCount) nextOffset = totalCount - 1

	// calculate last offset
	let lastOffset = (totalPages - 1) * limit
	if (lastOffset < 0) lastOffset = 0
	else if (lastOffset > totalCount) lastOffset = totalCount - 1

	// return pagination object
	return {
		firstPage: 1,
		totalPages,
		currentPage,
		previousPage,
		nextPage,

		currentOffset,
		previousOffset,
		nextOffset,
		lastOffset,
		firstOffset: 0,
	}
}
