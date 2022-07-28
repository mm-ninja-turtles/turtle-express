"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const create_path_1 = require("./create-path");
function createRouter(router) {
    const use = (...handlers) => router.use(...handlers);
    const path = (path, options) => (0, create_path_1.createPath)(router, path, options);
    const setup = (expressApp, options) => {
        const { paths } = options;
        paths.forEach((eachPath) => {
            const { _path, _handlerColl } = eachPath;
            _handlerColl.forEach((eachHandler) => {
                const { method, handler } = eachHandler;
                if (method === 'get')
                    return router.get(_path, handler);
                else if (method === 'post')
                    return router.post(_path, handler);
                else if (method === 'put')
                    return router.put(_path, handler);
                else if (method === 'patch')
                    return router.patch(_path, handler);
                else if (method === 'delete')
                    return router.delete(_path, handler);
                else
                    throw new Error(`Unknown method: ${method}`);
            });
        });
        expressApp.use(router);
    };
    return { use, path, setup };
}
exports.createRouter = createRouter;
//# sourceMappingURL=create-router.js.map