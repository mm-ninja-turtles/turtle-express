import type { Router } from 'express'
import type { Handler, HandlerMeta } from './create-handler'

export type Path = `/${string}`
export type PathFunction = (path: Path, options?: PathOptions) => PathReturnType
export interface PathOptions {}

export interface PathReturnType {
  /** Current path */
  _path: Path
  /** Collection of handlers meta data created from `handler()` function. */
  _handlerColl: HandlerMeta[]
  /**
   * Handler function. Create a express request handler function from `resolver` function
   * and bind it to the current path handler collection array, which will then be used
   * inside the setup function.
   *
   * usage:
   * ```ts
   * const router = createRouter(Router())
   * const hello = router.path('/hello') // create a `/hello` path
   *
   * hello.handler({
   *   method: 'get',
   *   resolver() {
   *     return 'hello world'
   *   }
   * })
   * ```
   */
  handler: Handler
  /**
   * Path function. Create a sub path function from the current path.
   *
   * usage:
   * ```ts
   * const router = createRouter(Router())
   * const hello = router.path('/hello') // create a `/hello` path
   *
   * hello.handler({
   *   method: 'get',
   *   resolver() {
   *     return 'hello world'
   *   }
   * })
   *
   * const helloWithName = hello.path('/:name') // create a `/hello/:name` path
   * helloWithName.handler({
   *   method: 'get',
   *   params: z.object({ name: z.string() }),
   *   resolver({ ctx }) {
   *     return `hello ${ctx.params.name}`
   *   }
   * })
   */
  path: PathFunction
}

export function createPath(
  router: Router,
  path: Path,
  options?: PathOptions,
): PathReturnType {
  // handlers collection
  // keep track of all handlers for the provided path
  const handlerColl: HandlerMeta[] = []

  // create a handler function to bind to the router
  const handler: Handler = (options) => {
    const { method, resolver } = options
    // create new handler collection object
    const handlerMeta: HandlerMeta = {
      method,
      // handler function
      handler: async (request, response) => {
        const resolverResult = await resolver()
        response.send(resolverResult)
      },
    }
    // push to the handler tracker collection
    handlerColl.push(handlerMeta)
  }

  // create a new sub-path base on the current path function to bind to the router
  const subPath: PathFunction = (subPath, options) => {
    const newPath = `${path}${subPath}` as Path
    return createPath(router, newPath, options)
  }

  return {
    // returns starts with _ are only for internal use
    _path: path,
    _handlerColl: handlerColl,
    handler,
    path: subPath,
  }
}
