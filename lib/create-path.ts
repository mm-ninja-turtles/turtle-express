import type { Router } from 'express'
import type { ZodType } from 'zod'
import type { HandlerMeta, HandlerOptions } from './create-handler'

import { createHandler } from './create-handler'

export type Path = `/${string}`

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
   * example:
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
  handler: <
    // #region HandlerOptions Http Status Code Generics
    // INFORMATION RESPONSES
    R100 extends ZodType,
    R101 extends ZodType,
    R102 extends ZodType,
    R103 extends ZodType,
    // SUCCESSFUL RESPONSES
    R200 extends ZodType,
    R201 extends ZodType,
    R202 extends ZodType,
    R203 extends ZodType,
    R204 extends ZodType,
    R205 extends ZodType,
    R206 extends ZodType,
    R207 extends ZodType,
    R208 extends ZodType,
    R226 extends ZodType,
    // REDIRECTION MESSAGES
    R300 extends ZodType,
    R301 extends ZodType,
    R302 extends ZodType,
    R303 extends ZodType,
    R304 extends ZodType,
    R305 extends ZodType,
    R306 extends ZodType,
    R307 extends ZodType,
    R308 extends ZodType,
    // CLIENT ERROR RESPONSES
    R400 extends ZodType,
    R401 extends ZodType,
    R402 extends ZodType,
    R403 extends ZodType,
    R404 extends ZodType,
    R405 extends ZodType,
    R406 extends ZodType,
    R407 extends ZodType,
    R408 extends ZodType,
    R409 extends ZodType,
    R410 extends ZodType,
    R411 extends ZodType,
    R412 extends ZodType,
    R413 extends ZodType,
    R414 extends ZodType,
    R415 extends ZodType,
    R416 extends ZodType,
    R417 extends ZodType,
    R418 extends ZodType,
    R421 extends ZodType,
    R422 extends ZodType,
    R423 extends ZodType,
    R424 extends ZodType,
    R425 extends ZodType,
    R426 extends ZodType,
    R428 extends ZodType,
    R429 extends ZodType,
    R431 extends ZodType,
    R451 extends ZodType,
    // SERVER ERROR RESPONSES
    R500 extends ZodType,
    R501 extends ZodType,
    R502 extends ZodType,
    R503 extends ZodType,
    R504 extends ZodType,
    R505 extends ZodType,
    R506 extends ZodType,
    R507 extends ZodType,
    R508 extends ZodType,
    R510 extends ZodType,
    R511 extends ZodType,
    // #endregion
  >(
    options: HandlerOptions<
      // #region Http Status Code Generics
      // INFORMATION RESPONSES
      R100,
      R101,
      R102,
      R103,
      // SUCCESSFUL RESPONSES
      R200,
      R201,
      R202,
      R203,
      R204,
      R205,
      R206,
      R207,
      R208,
      R226,
      // REDIRECTION MESSAGES
      R300,
      R301,
      R302,
      R303,
      R304,
      R305,
      R306,
      R307,
      R308,
      // CLIENT ERROR RESPONSES
      R400,
      R401,
      R402,
      R403,
      R404,
      R405,
      R406,
      R407,
      R408,
      R409,
      R410,
      R411,
      R412,
      R413,
      R414,
      R415,
      R416,
      R417,
      R418,
      R421,
      R422,
      R423,
      R424,
      R425,
      R426,
      R428,
      R429,
      R431,
      R451,
      // SERVER ERROR RESPONSES
      R500,
      R501,
      R502,
      R503,
      R504,
      R505,
      R506,
      R507,
      R508,
      R510,
      R511
      // #endregion
    >,
  ) => void
  /**
   * Path function. Create a sub path function from the current path.
   *
   * example:
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
  path: (path: Path, options?: PathOptions) => PathReturnType
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
  const handler = <
    // #region HandlerOptions Http Status Code Generics
    // INFORMATION RESPONSES
    R100 extends ZodType,
    R101 extends ZodType,
    R102 extends ZodType,
    R103 extends ZodType,
    // SUCCESSFUL RESPONSES
    R200 extends ZodType,
    R201 extends ZodType,
    R202 extends ZodType,
    R203 extends ZodType,
    R204 extends ZodType,
    R205 extends ZodType,
    R206 extends ZodType,
    R207 extends ZodType,
    R208 extends ZodType,
    R226 extends ZodType,
    // REDIRECTION MESSAGES
    R300 extends ZodType,
    R301 extends ZodType,
    R302 extends ZodType,
    R303 extends ZodType,
    R304 extends ZodType,
    R305 extends ZodType,
    R306 extends ZodType,
    R307 extends ZodType,
    R308 extends ZodType,
    // CLIENT ERROR RESPONSES
    R400 extends ZodType,
    R401 extends ZodType,
    R402 extends ZodType,
    R403 extends ZodType,
    R404 extends ZodType,
    R405 extends ZodType,
    R406 extends ZodType,
    R407 extends ZodType,
    R408 extends ZodType,
    R409 extends ZodType,
    R410 extends ZodType,
    R411 extends ZodType,
    R412 extends ZodType,
    R413 extends ZodType,
    R414 extends ZodType,
    R415 extends ZodType,
    R416 extends ZodType,
    R417 extends ZodType,
    R418 extends ZodType,
    R421 extends ZodType,
    R422 extends ZodType,
    R423 extends ZodType,
    R424 extends ZodType,
    R425 extends ZodType,
    R426 extends ZodType,
    R428 extends ZodType,
    R429 extends ZodType,
    R431 extends ZodType,
    R451 extends ZodType,
    // SERVER ERROR RESPONSES
    R500 extends ZodType,
    R501 extends ZodType,
    R502 extends ZodType,
    R503 extends ZodType,
    R504 extends ZodType,
    R505 extends ZodType,
    R506 extends ZodType,
    R507 extends ZodType,
    R508 extends ZodType,
    R510 extends ZodType,
    R511 extends ZodType,
    // #endregion
  >(
    options: HandlerOptions<
      // #region Http Status Code Generics
      // INFORMATION RESPONSES
      R100,
      R101,
      R102,
      R103,
      // SUCCESSFUL RESPONSES
      R200,
      R201,
      R202,
      R203,
      R204,
      R205,
      R206,
      R207,
      R208,
      R226,
      // REDIRECTION MESSAGES
      R300,
      R301,
      R302,
      R303,
      R304,
      R305,
      R306,
      R307,
      R308,
      // CLIENT ERROR RESPONSES
      R400,
      R401,
      R402,
      R403,
      R404,
      R405,
      R406,
      R407,
      R408,
      R409,
      R410,
      R411,
      R412,
      R413,
      R414,
      R415,
      R416,
      R417,
      R418,
      R421,
      R422,
      R423,
      R424,
      R425,
      R426,
      R428,
      R429,
      R431,
      R451,
      // SERVER ERROR RESPONSES
      R500,
      R501,
      R502,
      R503,
      R504,
      R505,
      R506,
      R507,
      R508,
      R510,
      R511
      // #endregion
    >,
  ) => {
    const handlerMeta = createHandler<
      // #region Http Status Code Generics
      // INFORMATION RESPONSES
      R100,
      R101,
      R102,
      R103,
      // SUCCESSFUL RESPONSES
      R200,
      R201,
      R202,
      R203,
      R204,
      R205,
      R206,
      R207,
      R208,
      R226,
      // REDIRECTION MESSAGES
      R300,
      R301,
      R302,
      R303,
      R304,
      R305,
      R306,
      R307,
      R308,
      // CLIENT ERROR RESPONSES
      R400,
      R401,
      R402,
      R403,
      R404,
      R405,
      R406,
      R407,
      R408,
      R409,
      R410,
      R411,
      R412,
      R413,
      R414,
      R415,
      R416,
      R417,
      R418,
      R421,
      R422,
      R423,
      R424,
      R425,
      R426,
      R428,
      R429,
      R431,
      R451,
      // SERVER ERROR RESPONSES
      R500,
      R501,
      R502,
      R503,
      R504,
      R505,
      R506,
      R507,
      R508,
      R510,
      R511
      // #endregion
    >(options)
    // push to the handler tracker collection
    handlerColl.push(handlerMeta)
  }

  // create a new sub-path base on the current path function to bind to the router
  const subPath = (subPath: Path, options?: PathOptions) => {
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
