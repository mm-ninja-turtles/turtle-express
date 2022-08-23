import { Express, RequestHandler, Router } from 'express'
import { OpenAPIV3_1 } from 'openapi-types'
import { createPath, PathOptions, PathReturnType } from '../path/create-path'
import { Path } from '../types/types'

export interface RouterOptions {
	basePath?: Path
	openApi?: {
		info: OpenAPIV3_1.InfoObject
		tags?: OpenAPIV3_1.TagObject[]
		servers?: OpenAPIV3_1.ServerObject[]
	}
}

export interface SetupOptions {
	paths: PathReturnType[]
}

export interface RouterReturnType {
	use: (..._handlers: RequestHandler[]) => Router
	path: (path: Path, options?: PathOptions) => PathReturnType
	setup: (expressApp: Express, options: SetupOptions) => void
}

export function createRouter(
	_router: Router,
	_options?: RouterOptions,
): RouterReturnType {
	const basePath = _options?.basePath ?? '/'

	return {
		use(..._handlers) {
			return _router.use(..._handlers)
		},
		path(path, options) {
			return createPath(path, options)
		},
		setup(expressApp, options) {
			const paths = options.paths

			paths.forEach((eachPath) => {
				eachPath._handlers.forEach((eachHandlers) => {
					const { _method } = eachHandlers
					_router[_method](eachPath._path, ...eachHandlers._middlewares)
				})
			})

			expressApp.use(basePath, _router)
		},
	}
}
