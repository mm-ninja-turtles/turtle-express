import { customContext } from './custom-context'
import { customResolver } from './custom-resolver'
import { fetchApi } from './fetch-api'
import { guard } from './guard'
import { hello } from './hello'
import { helloName } from './hello/name'
import { requestValidation } from './request-validation'
import { validation } from './validation'

export const paths = [
	customContext,
	customResolver,
	fetchApi,
	guard,
	hello,
	helloName,
	requestValidation,
	validation,
]
