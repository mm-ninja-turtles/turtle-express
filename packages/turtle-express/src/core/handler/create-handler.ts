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
				success: true as boolean,
				status: 200 as keyof HttpStatusCodes,
				failedReason: '' as '' | Exclude<LifeCycleStates, 'idle' | 'final'>,
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
				if (state.current === 'idle') {
					state.previous = state.current
					state.current = 'request_validation'
				}

				if (state.current === 'request_validation') {
					if (state.previous !== 'idle')
						throw new Error('[case `request_validation`]: Invalid state')

					if (options.request) {
						const validation = requestValidation(req, options.request)

						handlerContext.requestValidation = validation.context as any

						if (validation.ifOneValidationFailed())
							state.current = 'before_response'
					}

					state.previous = state.current
					state.current = 'resolver'
				}

				if (state.current === 'resolver') {
					if (state.previous !== 'request_validation')
						throw new Error('[case `resolver`]: Invalid state')

					const { params, query, body } = handlerContext.requestValidation

					const ctx = {
						params: params?.success ? params.data : null,
						query: query?.success ? query.data : null,
						body: body?.success ? body.data : null,
					}

					handlerContext.resolver = await options.resolver(
						resolverType === 'controlled'
							? ({ ctx, req } as any)
							: ({ ctx, req, res } as any),
					)

					state.previous = state.current

					if (resolverType === 'controlled')
						state.current = 'resolver_validation'
					else state.current = 'final'
				}

				if (state.current === 'resolver_validation') {
					if (state.previous !== 'resolver')
						throw new Error('[case `resolver_validation`]: Invalid state')

					handlerContext.resolverValidation = resolverValidation(
						handlerContext.resolver,
						options.response,
					)

					state.previous = state.current
					state.current = 'before_response'
				}

				if (state.current === 'before_response') {
					if (state.previous === 'request_validation') {
						const { params, query, body } = handlerContext.requestValidation

						const error = {
							params: params?.success === true ? null : params?.error.format(),
							query: query?.success === true ? null : query?.error.format(),
							body: body?.success === true ? null : body?.error.format(),
						}

						handlerContext.response = {
							failedReason: 'request_validation',
							status: 400,
							success: false,
							message: 'Validation Failed.',
							data: null,
							error,
						}
					} else if (state.previous === 'resolver_validation') {
						const resolverResult = handlerContext.resolver
						const resolverValidation = handlerContext.resolverValidation

						let status = Object.keys(
							resolverResult,
						)[0] as unknown as keyof HttpStatusCodes

						let message = 'Success.'

						if (status < 400 && resolverValidation?.success === false) {
							status = 400
							message = 'Response Validation Failed.'
						} else if (resolverValidation?.success === true && status >= 400) {
							message = 'Failed.'
						}

						handlerContext.response = {
							failedReason: 'resolver_validation',
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
					} else throw new Error('[case `before_response`]: Invalid state')

					state.previous = state.current
					state.current = 'final'
				}

				if (state.current === 'final') {
					if (state.previous === 'resolver') {
						return handlerContext.resolver
					} else if (state.previous === 'before_response') {
						const response = handlerContext.response

						const status = Number(response.status)
						const body = {
							success: response.success,
							message: response.message,
							data: response.data,
							error: response.error,
						}

						return res.status(status).send(body)
					} else throw new Error('[case `final`]: Invalid state')
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
