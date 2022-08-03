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
		200: z.string({}),
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
	method: 'get',
	params: z.object({
		id: z.string().transform((v) => parseInt(v)),
	}),
	response: {
		200: z.string(),
	},
	resolver({ ctx }) {
		const { id } = ctx.params

		return {
			200: 'request validation id: ' + id + ' and type is: ' + typeof id,
		}
	},
})

router.setup(app, {
	paths: [hello, helloWithName, validationTest, guardTest, requestValidation],
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
