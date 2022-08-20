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

export { createRouter } from './core/create-router'
export { errorHandler, getPagination, paginationSchema } from './helpers'

export type { Method } from './types'
export type { SetupOptions, CreateRouterReturnType } from './core/create-router'
export type { Path, PathOptions, PathReturnType } from './core/create-path'
export type { HandlerOptions } from './core/create-handler'
export type {
	GetPaginationArgs,
	GetPaginationReturnType,
} from './helpers/index'
