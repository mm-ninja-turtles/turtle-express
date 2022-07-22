import type { Express, Router, RequestHandler } from 'express';
import type { RouterOptions, SetupOptions } from './types';
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
};
//# sourceMappingURL=create-router.d.ts.map