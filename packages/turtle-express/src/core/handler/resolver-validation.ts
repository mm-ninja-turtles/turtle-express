import { HandlerResponse } from './create-handler'

export function resolverValidation<
	ResponseSchema extends HandlerResponse = HandlerResponse,
>(resolvedObj: any, schemas: ResponseSchema) {
	// resolved object might be a object of many keys
	// since response shape is reflected with `HttpStatusCodes`
	// get the first most key of the resolved object
	// which is ideally the result of the resolver
	const resolvedKey = Object.keys(resolvedObj)[0]

	// get the resolved object
	const resolved = resolvedObj[resolvedKey]

	// get the same schema as the resolved key
	const resolvedSchema =
		schemas[resolvedKey as unknown as keyof HandlerResponse]

	// throw the error if resolved key's validation schema is not provided
	if (resolvedSchema === undefined)
		throw new Error(
			'The `controlled` resolver type need at least one `response schema`.',
		)

	// safe parse and return the result
	return resolvedSchema.safeParse(resolved)
}
