import { customResolver } from './custom-resolver'
import { fetchApi } from './fetch-api'
import { hello } from './hello'
import { helloName } from './hello/name'
import { paginationTest } from './pagination-test'
import { requestValidation } from './request-validation'
import { validation } from './validation'

export const paths = [
	customResolver,
	fetchApi,
	paginationTest,
	hello,
	helloName,
	requestValidation,
	validation,
]
