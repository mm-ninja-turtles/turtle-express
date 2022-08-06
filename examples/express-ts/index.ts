import express, { Router } from 'express'
import { createRouter } from 'bulbasaur-express'
import { z } from 'zod'

const port = 8080
const app = express()
const _router = Router()

const router = createRouter(_router)

const hello = router.path('/hello')

hello.handler({
	method: 'get',
	response: {
		200: z.string(),
	},
	resolver() {
		return { 200: 'Hello' }
	},
})

hello.handler({
	method: 'post',
	response: {
		200: z.object({
			age: z.number(),
		}),
		400: z.object({
			message: z.string(),
		}),
	},
	resolver() {
		const rand = Math.random()

		if (rand > 0.5)
			return {
				400: { message: 'Bad Request' },
			}

		return {
			200: { age: 20 },
		}
	},
})

const helloWithName = hello.path('/:name')

helloWithName.handler({
	method: 'get',
	response: {
		200: z.string(),
	},
	resolver() {
		return {
			200: 'Hello Name!',
		}
	},
})

const validationTest = router.path('/validation')

validationTest.handler({
	method: 'get',
	response: {
		200: z.object({
			email: z.string().email(),
			password: z.number(),
		}),
	},
	resolver() {
		return {
			200: {
				email: 'joshua@gmail',
				password: 123,
			},
		}
	},
})

const guardTest = router.path('/guard')

guardTest.handler({
	method: 'get',
	guard() {
		const rand = Math.random()
		return { pass: rand > 0.5, response: 'guarded' }
	},
	response: {
		200: z.string(),
	},
	resolver() {
		return {
			200: 'hello',
		}
	},
})

const requestValidation = router.path('/request-validation/:id')

requestValidation.handler({
	method: 'post',
	request: {
		params: z.object({
			id: z.string().transform((v) => parseInt(v)),
		}),
		query: z.object({
			limit: z
				.string()
				.default('10')
				.transform((v) => Number(v)),
		}),
		body: z.object({
			age: z.number(),
			dateOfBirth: z
				.string()
				.regex(/^\d\d\d\d-\d\d-\d\d$/g, {
					message:
						'dateOfBirth must be a valid date format string (YYYY-MM-DD).',
				})
				.transform((v) => new Date(v)),
		}),
	},
	response: {
		200: z.string(),
	},
	resolver({ ctx }) {
		const { id } = ctx.params

		console.log(ctx.body)

		return {
			200: 'request validation id: ' + id + ' and type is: ' + typeof id,
		}
	},
})

const customResolver = router.path('/custom-resolver')

customResolver.handler({
	method: 'get',
	uncontrolledResolver: true,
	resolver({ res }) {
		res.setHeader('Content-Type', 'text/html')
		res.send('<body><h1>Hi</hi></body>')
	},
})

customResolver.handler({
	method: 'post',
	resolver({ ctx }) {
		return {
			200: ctx,
		}
	},
})

router.setup(app, {
	paths: [
		hello,
		helloWithName,
		validationTest,
		guardTest,
		requestValidation,
		customResolver,
	],
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
