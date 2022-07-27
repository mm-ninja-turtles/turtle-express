import type { Express, Router, RequestHandler } from 'express'
import { createPath } from './create-path'
import type { PathOptions, Route, RouterOptions, SetupOptions } from './types'

export function createRouter(router: Router, routerOptions?: RouterOptions) {
  return {
    /** Express's `use` function. */
    use(...handlers: RequestHandler[]) {
      return router.use(...handlers)
    },
    /**
     * Setup router with express app instance and bind paths to the router.
     *
     * @param expressApp
     * @param setupOptions
     *
     * example:
     * ```ts
     * import express, { Router } from 'express'
     * const app = express()
     * const router = createRouter(Router())
     * const users = router.path('/users')
     * ...
     * router.setup(app, {
     *   paths: [users]
     * })
     * ```
     */
    setup(expressApp: Express, setupOptions: SetupOptions = { paths: [] }) {
      const { paths } = setupOptions

      // bind paths and handlers to the router
      paths?.forEach((meta) => {
        meta.handlers.forEach(({ method, handler }) => {
          if (method === 'get') router.get(meta.path, handler)
          if (method === 'post') router.post(meta.path, handler)
          if (method === 'put') router.put(meta.path, handler)
          if (method === 'patch') router.patch(meta.path, handler)
          if (method === 'delete') router.delete(meta.path, handler)
        })
      })

      // bind router to express app
      expressApp.use(router)
    },
    /**
     * Generate a path object to bind with router setup function.
     * 
     * example:
     * ```ts
     * const app = express()
     * const router = createRouter(Router())
     * 
     * const users = router.path('/users')
     * 
     * users.handler({
     *  method: 'get',
     *  resolver() {
     *   return 'users'
     *  }
     * })
     * 
     * router.setup(app, {
     *  paths: [users.meta]
     * })
     * ```
     * 
     * @param path 
     * @param pathOptions 
     */
    path(path: Route, pathOptions?: PathOptions) {
      return createPath(router, path, pathOptions)
    }
  }
}
