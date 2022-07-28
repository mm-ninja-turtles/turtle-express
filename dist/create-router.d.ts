import type { Express, Router, RequestHandler } from 'express';
import type { PathFunction, PathReturnType } from './create-path';
export declare type UseFunction = (...handlers: RequestHandler[]) => Router;
export interface SetupOptions {
    paths: PathReturnType[];
}
export declare type SetupFunction = (expressApp: Express, options: SetupOptions) => void;
export interface CreateRouterReturnType {
    /** Express's `use` function. */
    use: UseFunction;
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
    path: PathFunction;
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
    setup: SetupFunction;
}
export declare function createRouter(router: Router): CreateRouterReturnType;
//# sourceMappingURL=create-router.d.ts.map