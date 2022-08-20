import { describe, it } from 'vitest'
import zod from 'zod'
import { extendsZodWithOpenApi } from '../zod-extends-openapi'
import { zodToOpenApiJson } from '../zod-to-open-api-json'

const z = extendsZodWithOpenApi(zod)

describe('[zodToOpenApiJson function]', () => {
	it('Should provide Response schema.', () => {
		const authSchema = z.openApiResponse({
			title: 'Authentication',
			schema: z
				.object({
					name: z.string().describe('Name of logged in user.'),
					token: z.string().describe('JWT token.'),
					expireTime: z
						.number()
						.transform((v) => new Date(new Date().getTime() + v))
						.describe('JWT token expire time.'),
				})
				.describe('Authentication response schema.'),
		})
		const schema = zodToOpenApiJson(authSchema)

		console.log(schema)
	})

	it('Should provide Request Query schema.', () => {
		const bookAuthorSchema = z.openApiRequest({
			type: 'RequestQuery',
			title: 'Book Author List',
			schema: z.strictObject({
				limit: z
					.string()
					.default('10')
					.transform((v) => parseInt(v))
					.optional(),
				page: z
					.string()
					.default('1')
					.transform((v) => parseInt(v)),
			}),
		})
		const schema = zodToOpenApiJson(bookAuthorSchema)

		console.log(schema)
	})

	it('Should provide Request Param schema.', () => {
		const authorIdParamSchema = z.openApiRequest({
			type: 'RequestParam',
			title: 'Author Id',
			schema: z.strictObject({
				authorId: z.string().uuid().describe('Author Id.'),
			}),
		})
		const schema = zodToOpenApiJson(authorIdParamSchema)

		console.log(schema)
	})

	it('Assemble all schema.', () => {
		const requestParamSchema = z.openApiRequest({
			type: 'RequestParam',
			title: 'Post Id',
			schema: z.object({
				postId: z.string().uuid().describe('Post Id.').describe('Post Id.'),
			}),
		})
		const param = zodToOpenApiJson(requestParamSchema)

		const requestQuerySchema = z.openApiRequest({
			type: 'RequestQuery',
			title: 'Api Token',
			schema: z.object({
				token: z.string().describe('Api Token.'),
			}),
		})
		const query = zodToOpenApiJson(requestQuerySchema)

		const requestBodySchema = z.openApiRequest({
			type: 'RequestBody',
			title: 'Post Body',
			schema: z.object({
				title: z.string().describe('Post Title.'),
			}),
		})
		const body = zodToOpenApiJson(requestBodySchema)

		const responseSchema = z.openApiResponse({
			title: 'Post Response',
			schema: z.object({
				id: z.string().uuid().describe('Post Id.'),
				title: z.string().describe('Post Title.'),
			}),
		})
		const response = zodToOpenApiJson(responseSchema)

		console.log({
			param,
			query,
			body,
			response,
		})
	})
})
