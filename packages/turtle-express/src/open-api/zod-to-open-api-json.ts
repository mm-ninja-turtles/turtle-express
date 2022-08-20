import type { ZodType } from 'zod'
import type { OpenAPIV3_1 } from 'openapi-types'
import type { ExtendsZodWithOpenApiReturnType } from './zod-extends-openapi'
import { z } from 'zod'
import { chain } from 'lodash-es'

/**
 * Function to convert each ZodType schema to OpenAPI JSON schema.
 */
export function zodToOpenApiJson<
	Schema extends ExtendsZodWithOpenApiReturnType<ZodType>,
>(schema: Schema): any {
	const { type } = schema._openApi

	const openApiJsonElement = createOpenApiJsonElement(schema)

	if (type === 'Response') {
		const mediaType = schema._openApi.mediaType ?? 'application/json'

		const response: OpenAPIV3_1.ResponseObject = {
			description: openApiJsonElement.description ?? '',
			content: {
				[mediaType]: {
					schema: openApiJsonElement,
				},
			},
		}
		return response
	}

	if (type === 'RequestQuery' || type === 'RequestParam') {
		const parameters: OpenAPIV3_1.ParameterObject[] = []

		Object.keys(openApiJsonElement?.properties ?? {}).forEach((key) => {
			parameters.push({
				name: key,
				in: type === 'RequestQuery' ? 'query' : 'path',
				schema: openApiJsonElement?.properties?.[key] as any,
			})
		})

		return parameters
	}

	if (type === 'RequestBody') {
		const mediaType = schema._openApi.mediaType ?? 'application/json'

		const requestBody: OpenAPIV3_1.RequestBodyObject = {
			description: openApiJsonElement.description ?? '',
			content: {
				[mediaType]: {
					schema: openApiJsonElement,
				},
			},
		}

		return requestBody
	}

	return openApiJsonElement
}

/**
 * @Credit https://github.com/kbkk/abitia/blob/master/packages/zod-dto/src/OpenApi/zodTypeToOpenApi.ts
 * The following function code is inspired and reused some from the above package.
 *
 * Return the OpenAPI schema for a Zod type.
 */
export function createOpenApiJsonElement<
	Schema extends ExtendsZodWithOpenApiReturnType<z.ZodTypeAny>,
>(schema: Schema): OpenAPIV3_1.SchemaObject {
	const schemaDef = schema._def

	function createOpenApi(extendSchema: any): OpenAPIV3_1.SchemaObject {
		const title = schema?._openApi?.title ?? ''
		const type = schema?._openApi?.type ?? ''

		return {
			required: true,
			...extendSchema,
			title: chain(`${title} ${type}`).camelCase().upperFirst().value() ?? '',
			description: schemaDef?.description ?? '',
		}
	}

	switch (schema.constructor.name) {
		case z.ZodObject.name: {
			const shape = schemaDef.shape()
			const shapeKeys = Object.keys(shape)
			const properties = {} as { [key: string]: unknown }

			shapeKeys.forEach((key) => {
				const property = createOpenApiJsonElement(shape[key])
				properties[key] = property
			})

			return createOpenApi({
				type: 'object',
				properties,
			})
		}
		case z.ZodOptional.name: {
			return createOpenApi({
				...createOpenApiJsonElement(schemaDef.innerType),
				required: false,
			})
		}
		case z.ZodNullable.name: {
			return createOpenApi({
				...createOpenApiJsonElement(schemaDef.innerType),
				nullable: true,
			})
		}
		case z.ZodTransformer.name: {
			return createOpenApi({
				...createOpenApiJsonElement(schemaDef.schema),
			})
		}
		case z.ZodEnum.name: {
			const enumValues = schemaDef.values

			return createOpenApi({
				type: 'string',
				enum: enumValues,
			})
		}
		case z.ZodLiteral.name: {
			return createOpenApi({
				type: 'string',
				enum: [schemaDef.value],
			})
		}
		case z.ZodUnion.name: {
			const options = schemaDef.options

			return createOpenApi({
				oneOf: options.map((item: any) => createOpenApiJsonElement(item)),
			})
		}
		case z.ZodTuple.name: {
			const items = schemaDef.items

			return createOpenApi({
				type: 'array',
				items: {
					oneOf: items.map((item: any) => createOpenApiJsonElement(item)),
				},
				minItems: items.length,
				maxItems: items.length,
			})
		}
		case z.ZodArray.name: {
			const type = schemaDef.type

			return createOpenApi({
				type: 'array',
				items: type ? createOpenApiJsonElement(type) : {},
			})
		}
		case z.ZodBigInt.name: {
			return createOpenApi({
				type: 'integer',
				format: 'int64',
			})
		}
		case z.ZodString.name: {
			return createOpenApi({ type: 'string' })
		}
		case z.ZodNumber.name: {
			return createOpenApi({ type: 'number' })
		}
		case z.ZodBoolean.name: {
			return createOpenApi({ type: 'boolean' })
		}
		case z.ZodDefault.name:
		default: {
			return createOpenApi({ type: 'string' })
		}
	}
}
