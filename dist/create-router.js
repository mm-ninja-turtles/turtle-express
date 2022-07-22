"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
function createRouter(router, routerOptions) {
    return {
        /** Express's `use` function. */
        use(...handlers) {
            return router.use(...handlers);
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
        setup(expressApp, setupOptions = { paths: [] }) {
            const { paths } = setupOptions;
            // bind paths and handlers to the router
            paths === null || paths === void 0 ? void 0 : paths.forEach((meta) => {
                meta.handlers.forEach(({ method, handler }) => {
                    if (method === 'get')
                        router.get(meta.path, handler);
                    if (method === 'post')
                        router.post(meta.path, handler);
                    if (method === 'put')
                        router.put(meta.path, handler);
                    if (method === 'patch')
                        router.patch(meta.path, handler);
                    if (method === 'delete')
                        router.delete(meta.path, handler);
                });
            });
            // bind router to express app
            expressApp.use(router);
        },
    };
    // function path(path: TRouteLiteral, pathOptions: PathOptions) {
    //   return createRoutePath(router, path, pathOptions)
    // }
}
exports.createRouter = createRouter;
//# sourceMappingURL=create-router.js.map