import { Router } from 'express'
import { createRouter } from 'turtle-express'

export const router = createRouter(Router({ mergeParams: true }), {
	basePath: '/api',
})
