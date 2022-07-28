import type { Router, RequestHandler } from 'express';
import type { Method } from './types';
export declare type Path = `/${string}`;
export declare type PathFunction = (path: Path, options?: PathOptions) => PathReturnType;
export interface PathOptions {
}
export interface PathReturnType {
    /** Current path */
    _path: Path;
    /** Collection of handlers meta data created from `handler()` function. */
    _handlerColl: HandlerMeta[];
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
    handler: Handler;
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
    path: PathFunction;
}
export interface HandlerMeta {
    method: Method;
    handler: RequestHandler;
}
/**
 * Resolver function. Create a express request handler function from `resolver` function.
 */
export declare type Resolver = <R>() => R | Promise<R>;
export interface HandlerOptions {
    method: Method;
    resolver: Resolver;
}
export declare type Handler = (options: HandlerOptions) => void;
export declare function createPath(router: Router, path: Path, options?: PathOptions): PathReturnType;
//# sourceMappingURL=create-path.d.ts.map