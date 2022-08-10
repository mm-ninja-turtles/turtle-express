import fetch, { Request, Response, Headers } from 'cross-fetch'

declare global {
	export type fetch = typeof fetch
}

function bindFetchApi() {
	global.fetch = fetch as any
	global.Request = Request as any
	global.Response = Response as any
	global.Headers = Headers
}
bindFetchApi()

export { createRouter } from './create-router'
export { errorHandler, getPagination, paginationSchema } from './helpers/_index'

export type { Method } from './types'
export type { SetupOptions, CreateRouterReturnType } from './create-router'
export type { Path, PathOptions, PathReturnType } from './create-path'
export type { HandlerOptions } from './create-handler'
export type {
	GetPaginationArgs,
	GetPaginationReturnType,
} from './helpers/_index'
