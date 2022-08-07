import { Router } from 'express'
import { createRouter } from 'turtle-express'

export const router = createRouter(Router(), { basePath: '/api' })
