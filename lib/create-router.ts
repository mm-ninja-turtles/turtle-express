import type { Express, Router, RequestHandler } from 'express'
import type { Path, PathOptions, PathReturnType } from './create-path'
// import type { Response } from './response'

import { createPath } from './create-path'

export type UseFunction = (...handlers: RequestHandler[]) => Router

export interface SetupOptions {
  paths: PathReturnType[]
}

export interface CreateRouterReturnType {
  /** Express's `use` function. */
  use: UseFunction
  /**
   * Generate a path object to bind with router setup function.
   *
   * @param path
   * @param pathOptions
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
   */
  path: (path: Path, options?: PathOptions) => PathReturnType
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
  setup: (expressApp: Express, options: SetupOptions) => void
}

export function createRouter(router: Router): CreateRouterReturnType {
  const use: UseFunction = (...handlers) => router.use(...handlers)

  const path = (path: Path, options?: PathOptions) =>
    createPath(router, path, options)

  const setup = (expressApp: Express, options: SetupOptions) => {
    const { paths } = options

    paths.forEach((eachPath) => {
      const { _path, _handlerColl } = eachPath

      _handlerColl.forEach((eachHandler) => {
        const { method, handler } = eachHandler

        if (method === 'get') return router.get(_path, handler)
        else if (method === 'post') return router.post(_path, handler)
        else if (method === 'put') return router.put(_path, handler)
        else if (method === 'patch') return router.patch(_path, handler)
        else if (method === 'delete') return router.delete(_path, handler)
        else throw new Error(`Unknown method: ${method}`)
      })
    })

    expressApp.use(router)
  }

  return { use, path, setup }
}
