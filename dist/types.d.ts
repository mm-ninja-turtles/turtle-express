import type { RequestHandler } from 'express';
/** HTTP request Methods */
export declare type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';
/** Route path string literal */
export declare type Route = `/${string}`;
/** Options for creating new route path. */
export interface PathOptions {
}
/** Path meta data for router to use. */
export interface Meta {
    path: Route;
    handlers: Array<{
        method: Method;
        handler: RequestHandler;
    }>;
}
/** Options for setup function. */
export interface SetupOptions {
    paths?: Meta[];
}
/** Options for each custom handlers. */
export interface HandlerOptions {
    method: Method;
    /**
     * TODO: new `response` handler option type (hint: might require zod)
     * TODO: infer resolver response type from `response` handler option
     */
    resolver: <R>() => R | Promise<R>;
}
export interface RouterOptions {
}
//# sourceMappingURL=types.d.ts.map