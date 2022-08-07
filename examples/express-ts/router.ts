import { Router } from 'express'
import { createRouter } from 'bulbasaur-express'

export const router = createRouter(Router(), { basePath: '/api' })
