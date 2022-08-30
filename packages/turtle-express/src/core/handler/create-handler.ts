import { Request, RequestHandler, Response } from 'express'
import { z, ZodType } from 'zod'
import { OpenAPIV3_1 } from 'openapi-types'
import { LifeCycleStates, Method, ResolverTypes } from '../types/types'
import { HttpStatusCodes } from '../types/http-status-codes'
import {
	requestValidation,
	RequestValidationReturnType,
} from './request-validation'
import { resolverValidation } from './resolver-validation'

export type HandlerRequest<
	Params extends ZodType | unknown,
	Query extends ZodType | unknown,
	Body extends ZodType | unknown,
> = {
	params?: Params extends ZodType ? Params : never
	query?: Query extends ZodType ? Query : never
	body?: Body extends ZodType ? Body : never
}

export type HandlerResponse = {
	// eslint-disable-next-line no-unused-vars
	[key in keyof HttpStatusCodes]?: ZodType
}

export interface RequestSchemasContext<
	Params extends ZodType | unknown,
	Query extends ZodType | unknown,
	Body extends ZodType | unknown,
> {
	params: Params extends ZodType ? z.infer<Params> : never
	query: Query extends ZodType ? z.infer<Query> : never
	body: Body extends ZodType ? z.infer<Body> : never
}

export type ResolverArgs<
	Params extends ZodType | unknown,
	Query extends ZodType | unknown,
	Body extends ZodType | unknown,
	ResolverType extends ResolverTypes,
> = ResolverType extends 'controlled'
	? {
			ctx: RequestSchemasContext<Params, Query, Body>
			req: Request
	  }
	: {
			ctx: RequestSchemasContext<Params, Query, Body>
			req: Request
			res: Response
	  }

export type ResolverReturnType<
	ResolverType extends ResolverTypes,
	ResponseSchema extends HandlerResponse,
> = {
	[key in keyof HandlerResponse]?: ResolverType extends 'controlled'
		? ResponseSchema[key] extends ZodType
			? z.infer<ResponseSchema[key]>
			: never
		: any
}

export interface HandlerOptions<
	Params extends ZodType | unknown,
	Query extends ZodType | unknown,
	Body extends ZodType | unknown,
	ResolverType extends ResolverTypes,
	ResponseSchema extends HandlerResponse = HandlerResponse,
> {
	id: string
	method: Method
	request?: HandlerRequest<Params, Query, Body>
	response: ResponseSchema
	middlewares?: RequestHandler[]
	resolverType?: ResolverType
	resolver: (
		args: ResolverArgs<Params, Query, Body, ResolverType>,
	) => ResolverType extends 'controlled'
		?
				| ResolverReturnType<ResolverType, ResponseSchema>
				| Promise<ResolverReturnType<ResolverType, ResponseSchema>>
		: any
}

interface CreateHandlerReturnType {
	_id: string
	_getOpenApiSchemas: () => OpenAPIV3_1.SchemaObject
	_getOpenApiPathItem: () => OpenAPIV3_1.PathItemObject
	_middlewares: RequestHandler[]
	_handlerFunc: RequestHandler
}

export function createHandler<
	Params extends ZodType | unknown,
	Query extends ZodType | unknown,
	Body extends ZodType | unknown,
	ResolverType extends ResolverTypes = 'controlled',
	ResponseSchema extends HandlerResponse = HandlerResponse,
>(
	options: HandlerOptions<Params, Query, Body, ResolverType, ResponseSchema>,
): CreateHandlerReturnType {
	const resolverType = options.resolverType ?? 'controlled'

	const _handlerFunc: RequestHandler = async (req, res, next) => {
		const handlerContext = {
			requestValidation: {
				params: null,
				query: null,
				body: null,
			} as RequestValidationReturnType<Params, Query, Body>['context'],
			resolverValidation: null as z.SafeParseReturnType<any, any> | null,
			resolver: null as any,
			response: {
				_failedReason: '' as '' | Exclude<LifeCycleStates, 'idle' | 'final'>,
				success: true as boolean,
				status: 200 as keyof HttpStatusCodes,
				message: 'Success.' as string,
				data: null as any,
				error: null as any,
			},
		}

		const state = {
			previous: 'idle' as LifeCycleStates,
			current: 'idle' as LifeCycleStates,
		}

		Promise.resolve()
			.then(async () => {
				// STATE: 1 - idle
				if (state.current === 'idle') {
					state.previous = state.current // idle
					state.current = 'request_validation'
				}

				// STATE: 2 - request_validation
				if (state.current === 'request_validation') {
					if (state.previous !== 'idle')
						throw new Error('[case `request_validation`]: Invalid state')

					// if request schema is provided
					if (options.request) {
						// run request validation
						const validation = requestValidation(req, options.request)

						// store validation result in context
						handlerContext.requestValidation = validation.context as any

						// if at least one validation failed
						if (validation.ifOneValidationFailed()) {
							// prepare response and response back with validation error
							state.previous = state.current // request_validation
							state.current = 'before_response'
						}

						// if no validation failed
						else {
							// continue to resolver function
							state.previous = state.current // request_validation
							state.current = 'resolver'
						}
					}

					// if request schema is not provided
					else {
						// skip to resolver function
						state.previous = state.current // request_validation
						state.current = 'resolver'
					}
				}

				// STATE: 3 - resolver
				if (state.current === 'resolver') {
					if (state.previous !== 'request_validation')
						throw new Error('[case `resolver`]: Invalid state')

					// get request validations from context
					const { params, query, body } = handlerContext.requestValidation

					// construct resolver function context object
					const ctx = {
						params: params?.success ? params.data : null,
						query: query?.success ? query.data : null,
						body: body?.success ? body.data : null,
					}

					// execute the resolver function and store the result in context
					handlerContext.resolver = await options.resolver(
						resolverType === 'controlled'
							? ({ ctx, req } as any) // only provide context and request if resolver is controlled
							: ({ ctx, req, res } as any), // provide context, request and response if resolver is not controlled
					)

					state.previous = state.current // resolver

					// go to resolver_validation state if resolver is controlled
					if (resolverType === 'controlled')
						state.current = 'resolver_validation'
					// skip to final if resolver is not controlled
					else state.current = 'final'
				}

				// STATE: 4 - resolver_validation
				if (state.current === 'resolver_validation') {
					if (state.previous !== 'resolver')
						throw new Error('[case `resolver_validation`]: Invalid state')

					// validate resolver result with response schema and store in context
					handlerContext.resolverValidation = resolverValidation(
						handlerContext.resolver,
						options.response,
					)

					// go to before_response to prepare response object
					state.previous = state.current // resolver_validation
					state.current = 'before_response'
				}

				// STATE: 5 - before_response
				if (state.current === 'before_response') {
					// STATE: 5.1 - if previous state is request_validation
					if (state.previous === 'request_validation') {
						// request validation might have failed
						// get request validation from context
						const { params, query, body } = handlerContext.requestValidation

						// construct error object
						const error = {
							params: params?.success === true ? null : params?.error.format(),
							query: query?.success === true ? null : query?.error.format(),
							body: body?.success === true ? null : body?.error.format(),
						}

						// set error response to context
						handlerContext.response = {
							_failedReason: 'request_validation',
							status: 400,
							success: false,
							message: 'Validation Failed.',
							data: null,
							error,
						}
					}

					// STATE: 5.2 - if previous state is resolver_validation
					else if (state.previous === 'resolver_validation') {
						// get resolver result
						const resolverResult = handlerContext.resolver
						// get resolver validation result
						const resolverValidation = handlerContext.resolverValidation

						// get the http status code to response
						// by getting the first result from the resolver result
						// which is the result of the resolver execution
						let status = Object.keys(
							resolverResult,
						)[0] as unknown as keyof HttpStatusCodes

						// set the response message default to Success.
						let message = 'Success.'

						// if http status is not in error range
						// and resolver validation failed,
						// validation failed
						if (status < 400 && resolverValidation?.success === false) {
							// set status to 400 with validation failed message.
							status = 400
							message = 'Response Validation Failed.'
						}

						// if http status is in error range
						// and resolver validation is success,
						// resolver failed response
						else if (status >= 400 && resolverValidation?.success === true) {
							// change message to Failed.
							message = 'Failed.'
						}

						// construct response object and store in context
						handlerContext.response = {
							_failedReason: 'resolver_validation',
							status,
							success: resolverValidation?.success ?? false,
							message,
							data:
								resolverValidation?.success === true
									? resolverValidation.data
									: null,
							error:
								resolverValidation?.success === true
									? null
									: resolverValidation?.error.format(),
						}
					}

					// STATE: 5.3 - otherwise, throw error, something might have gone wrong
					else throw new Error('[case `before_response`]: Invalid state')

					// go to final state
					state.previous = state.current // before_response
					state.current = 'final'
				}

				// STATE: 6 - final
				if (state.current === 'final') {
					// STATE: 6.1 - if previous state is from resolver
					if (state.previous === 'resolver') {
						// resolver is uncontrolled type
						// just return the resolver result
						return handlerContext.resolver
					}

					// STATE: 6.2 - if previous state is from before_response
					else if (state.previous === 'before_response') {
						// get response from context
						const response = handlerContext.response

						const status = Number(response.status)

						// construct response body with context
						const body = {
							success: response.success,
							message: response.message,
							data: response.data,
							error: response.error,
						}

						// response with status and body
						return res.status(status).send(body)
					}

					// STATE: 6.3 - otherwise, throw error something might have wrong
					else throw new Error('[case `final`]: Invalid state')
				}
			})
			.catch(next)
	}

	return {
		_id: options.id,
		_middlewares: options.middlewares ?? [],
		_getOpenApiSchemas() {
			return options as any
		},
		_getOpenApiPathItem() {
			return options as any
		},
		_handlerFunc,
	}
}
