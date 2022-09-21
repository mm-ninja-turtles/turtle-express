import {
	createBookBody,
	createBookResolver,
	createBookResponse,
} from '../../controllers/v1/books/create-book.controller'
import {
	deleteBookParam,
	deleteBookResolver,
	deleteBookResponse,
} from '../../controllers/v1/books/delete-book.controller'
import {
	getBookParam,
	getBookResolver,
	getBookResponse,
} from '../../controllers/v1/books/get-book.controller'
import {
	getBooksQuery,
	getBooksResolver,
	getBooksResponse,
} from '../../controllers/v1/books/get-books.controller'
import {
	updateBookBody,
	updateBookResolver,
	updateBookResponse,
} from '../../controllers/v1/books/update-book.controller'
import { router } from './router.v1'

export const books = router.path('/books')
export const bookId = books.path('/:_id')

books.handler({
	id: 'GetBooks',
	method: 'get',
	request: {
		query: getBooksQuery,
	},
	response: getBooksResponse,
	resolver: getBooksResolver,
})

books.handler({
	id: 'CreateBook',
	method: 'post',
	request: {
		body: createBookBody,
	},
	response: createBookResponse,
	resolver: createBookResolver,
})

bookId.handler({
	id: 'UpdateBook',
	method: 'put',
	request: {
		params: getBookParam,
		body: updateBookBody,
	},
	response: updateBookResponse,
	resolver: updateBookResolver,
})

bookId.handler({
	id: 'GetBook',
	method: 'get',
	request: {
		params: getBookParam,
	},
	response: getBookResponse,
	resolver: getBookResolver,
})

bookId.handler({
	id: 'DeleteBook',
	method: 'delete',
	request: {
		params: deleteBookParam,
	},
	response: deleteBookResponse,
	resolver: deleteBookResolver,
})
