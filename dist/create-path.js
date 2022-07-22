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
function createPath(router, path, pathOptions) {
    const meta = { path, handlers: [] };
    return {
        /**
         * Path meta data for router to use.
         */
        meta,
        /**
         * @param handlerOptions
         */
        handler(handlerOptions) {
            const { method, resolver } = handlerOptions;
            meta.handlers.push({
                method,
                handler(req, res) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const resolved = yield resolver();
                        res.json(resolved);
                    });
                },
            });
        },
        /**
         *
         * @param subPath
         * @param subPathOptions
         * @returns
         */
        path(subPath, subPathOptions) {
            const newPath = `${path}${subPath}`;
            return createPath(router, newPath, subPathOptions);
        },
    };
}
exports.createPath = createPath;
//# sourceMappingURL=create-path.js.map