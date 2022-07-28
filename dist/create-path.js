"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPath = void 0;
function createPath(router, path, options) {
    // handlers collection
    // keep track of all handlers for the provided path
    const handlerColl = [];
    // create a handler function to bind to the router
    const handler = (options) => {
        const { method, resolver } = options;
        // create new handler collection object
        const handlerMeta = {
            method,
            // handler function
            handler: (request, response) => __awaiter(this, void 0, void 0, function* () {
                const resolverResult = yield resolver();
                response.send(resolverResult);
            }),
        };
        // push to the handler tracker collection
        handlerColl.push(handlerMeta);
    };
    // create a new sub-path base on the current path function to bind to the router
    const subPath = (subPath, options) => {
        const newPath = `${path}${subPath}`;
        return createPath(router, newPath, options);
    };
    return {
        // returns starts with _ are only for internal use
        _path: path,
        _handlerColl: handlerColl,
        handler,
        path: subPath,
    };
}
exports.createPath = createPath;
//# sourceMappingURL=create-path.js.map