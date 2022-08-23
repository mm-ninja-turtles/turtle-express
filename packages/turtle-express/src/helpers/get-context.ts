import { Request } from 'express'
import { ZodType } from 'zod'
import { HandlerRequest } from '~/core/handler/create-handler'
import {
	requestValidation,
	RequestValidationReturnType,
} from '~/core/handler/request-validation'

export interface GetContextOptions<
	Params extends ZodType | unknown,
	Query extends ZodType | unknown,
	Body extends ZodType | unknown,
> {
	parseRequest?: boolean
	requestSchema?: HandlerRequest<Params, Query, Body>
}

export function getContext<
	Params extends ZodType | unknown = unknown,
	Query extends ZodType | unknown = unknown,
	Body extends ZodType | unknown = unknown,
>(req: Request, options?: GetContextOptions<Params, Query, Body>) {
	const parseRequest = options?.parseRequest ?? false
	const requestSchema = options?.requestSchema

	let validationResult = {
		params: null,
		query: null,
		body: null,
	} as RequestValidationReturnType<Params, Query, Body>['context']

	const context = {
		params: null as typeof validationResult['params'],
		query: null as typeof validationResult['query'],
		body: null as typeof validationResult['body'],
	}

	if (parseRequest === true && requestSchema === undefined)
		throw new Error('`requestSchema` is needed in order to parse the request.')

	if (parseRequest === true && requestSchema)
		validationResult = requestValidation(req, requestSchema).context

	context.params = validationResult.params
	context.query = validationResult.query
	context.body = validationResult.body

	return context
}
