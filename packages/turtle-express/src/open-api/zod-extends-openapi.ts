import type { z, ZodType } from 'zod'
import { cloneDeep } from 'lodash-es'

export type OpenApiType =
	| 'Response'
	| 'RequestParam'
	| 'RequestQuery'
	| 'RequestBody'

export interface OpenApiInfo<Schema extends ZodType> {
	title: string
	schema: Schema
	type: OpenApiType
	mediaType?: string
}

export type OpenApiRequestOptions<Schema extends ZodType> = Omit<
	OpenApiInfo<Schema>,
	'type'
> & {
	type: Exclude<OpenApiType, 'Response'>
}

export type OpenApiResponseOptions<Schema extends ZodType> = Omit<
	OpenApiInfo<Schema>,
	'type'
>

export type ExtendsZodWithOpenApiReturnType<Schema extends ZodType> = Schema & {
	_openApi: Omit<OpenApiInfo<Schema>, 'schema'>
}

export function extendsZodWithOpenApi(zod: typeof z) {
	// zod object cannot be extend
	// so need to clone it first to extend with custom object
	const zodClone = cloneDeep(zod)

	// add open api request info to zod object
	function openApiRequest<Schema extends ZodType>(
		options: OpenApiRequestOptions<Schema>,
	): ExtendsZodWithOpenApiReturnType<Schema> {
		// extends with request type
		return Object.assign(options.schema, {
			_openApi: {
				title: options.title,
				type: options.type,
			},
		}) as unknown as ExtendsZodWithOpenApiReturnType<Schema>
	}

	// add open api response info to zod object
	function openApiResponse<Schema extends ZodType>(
		options: OpenApiResponseOptions<Schema>,
	): ExtendsZodWithOpenApiReturnType<Schema> {
		// create extends object
		const _openApi: Omit<OpenApiInfo<Schema>, 'schema'> = {
			title: options.title,
			type: 'Response',
			mediaType: options.mediaType ?? 'application/json',
		}

		// extends with response type
		return Object.assign(options.schema, {
			_openApi,
		}) as unknown as ExtendsZodWithOpenApiReturnType<Schema>
	}

	// return extended zod object
	return Object.assign(zodClone, { openApiRequest, openApiResponse })
}
