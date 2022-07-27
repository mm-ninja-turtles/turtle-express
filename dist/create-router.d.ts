import type { Express, Router, RequestHandler } from 'express';
import type { PathOptions, Route, RouterOptions, SetupOptions } from './types';
export declare function createRouter(router: Router, routerOptions?: RouterOptions): {
    /** Express's `use` function. */
    use(...handlers: RequestHandler[]): Router;
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
    setup(expressApp: Express, setupOptions?: SetupOptions): void;
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
    path(path: Route, pathOptions?: PathOptions): {
        meta: import("./types").Meta;
        handler(handlerOptions: import("./types").HandlerOptions): void;
        path(subPath: `/${string}`, subPathOptions: PathOptions): any;
    };
};
//# sourceMappingURL=create-router.d.ts.map