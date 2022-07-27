import type { Router } from 'express'
import type { HandlerOptions, Meta, PathOptions, Route } from './types'

export function createPath(
  router: Router,
  path: Route,
  pathOptions?: PathOptions,
) {
  const meta: Meta = { path, handlers: [] }

  return {
    /**
     * Path meta data for router to use.
     */
    meta,
    /**
     * @param handlerOptions
     */
    handler(handlerOptions: HandlerOptions) {
      const { method, resolver } = handlerOptions

      meta.handlers.push({
        method,
        async handler(req, res) {
          const resolved = await resolver()
          res.json(resolved)
        },
      })
    },
    /**
     * Generate a sub path object base on the parent `path`.
     * 
     * example:
     * ```ts
     * const users = router.path('/users')
     * const usersId = users.path('/:id')
     * // will generate /users/:id
     * ```
     * 
     * @param subPath
     * @param subPathOptions
     * @returns
     */
    path(subPath: Route, subPathOptions: PathOptions) {
      const newPath = `${path}${subPath}` as Route
      return createPath(router, newPath, subPathOptions)
    },
  }
}
