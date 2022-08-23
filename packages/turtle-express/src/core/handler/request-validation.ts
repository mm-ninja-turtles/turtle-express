import { Request } from 'express'
import { z, ZodType } from 'zod'
import { HandlerRequest } from './create-handler'

export interface RequestValidationReturnType<
	Params extends ZodType | unknown,
	Query extends ZodType | unknown,
	Body extends ZodType | unknown,
> {
	context: {
		params: z.SafeParseReturnType<Params, Params> | null
		query: z.SafeParseReturnType<Query, Query> | null
		body: z.SafeParseReturnType<Body, Body> | null
	}
	ifSomeSchemasExists: () => boolean
	ifOneValidationFailed: () => boolean
}

export function requestValidation<
	Params extends ZodType | unknown,
	Query extends ZodType | unknown,
	Body extends ZodType | unknown,
>(
	req: Request,
	schemas: HandlerRequest<Params, Query, Body>,
): RequestValidationReturnType<Params, Query, Body> {
	const context: {
		params: z.SafeParseReturnType<Params, Params> | null
		query: z.SafeParseReturnType<Query, Query> | null
		body: z.SafeParseReturnType<Body, Body> | null
	} = {
		params: null,
		query: null,
		body: null,
	}

	if (schemas.params) {
		const params = req.params
		const paramsSchema = schemas.params
		context.params = paramsSchema.safeParse(params)
	}

	if (schemas.query) {
		const query = req.query
		const querySchema = schemas.query
		context.query = querySchema.safeParse(query)
	}

	if (schemas.body) {
		const body = req.body
		const bodySchema = schemas.body
		context.body = bodySchema.safeParse(body)
	}

	const ifSomeSchemasExists = () =>
		[schemas.params, schemas.query, schemas.body].some(
			(schema) => schema !== undefined,
		)

	const ifOneValidationFailed = () =>
		[context.params, context.query, context.body].some((validate) => {
			return validate?.success === false
		})

	return { context, ifSomeSchemasExists, ifOneValidationFailed }
}
