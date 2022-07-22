import type { Router } from 'express';
import type { HandlerOptions, Meta, PathOptions, Route } from './types';
export declare function createPath(router: Router, path: Route, pathOptions?: PathOptions): {
    /**
     * Path meta data for router to use.
     */
    meta: Meta;
    /**
     * @param handlerOptions
     */
    handler(handlerOptions: HandlerOptions): void;
    /**
     *
     * @param subPath
     * @param subPathOptions
     * @returns
     */
    path(subPath: Route, subPathOptions: PathOptions): any;
};
//# sourceMappingURL=create-path.d.ts.map