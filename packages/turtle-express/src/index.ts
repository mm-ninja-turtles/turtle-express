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

export { createRouter } from './core'
export {
	errorHandler,
	getContext,
	getPagination,
	paginationSchema,
} from './helpers'

export type {
	Method,
	HandlerOptions,
	HandlerRequest,
	Path,
	PathOptions,
	ResolverArgs,
	ResolverReturnType,
	ResolverTypes,
	RouterOptions,
	RouterReturnType,
	SetupOptions,
} from './core'
export type {
	GetContextOptions,
	GetPaginationArgs,
	GetPaginationReturnType,
} from './helpers'
