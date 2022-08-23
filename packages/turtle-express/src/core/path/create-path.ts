import { RequestHandler } from 'express'
import { OpenAPIV3_1 } from 'openapi-types'
import { ZodType } from 'zod'
import {
	createHandler,
	HandlerOptions,
	HandlerResponse,
} from '../handler/create-handler'
import { Method, Path, ResolverTypes } from '../types/types'

export interface PathOptions {
	middlewares?: RequestHandler[]
	openApi?: {
		tags?: OpenAPIV3_1.TagObject[]
	}
}

export interface PathHandler {
	_id: string
	_method: Method
	_middlewares: RequestHandler[]
	_getOpenApiSchemas: () => OpenAPIV3_1.SchemaObject
	_getOpenApiPathItem: () => OpenAPIV3_1.PathItemObject
}

export interface PathReturnType {
	_path: Path
	_handlers: PathHandler[]
	_openApi: PathOptions['openApi']
	path: typeof createPath
	handler: <
		Params extends ZodType,
		Query extends ZodType,
		Body extends ZodType,
		ResolverType extends ResolverTypes = 'controlled',
		ResponseSchema extends HandlerResponse = HandlerResponse,
	>(
		_handlerOptions: HandlerOptions<
			Params,
			Query,
			Body,
			ResolverType,
			ResponseSchema
		>,
	) => void
}

export function createPath(
	_path: Path,
	_options?: PathOptions,
): PathReturnType {
	const _handlers: PathHandler[] = []

	return {
		_path,
		_handlers,
		_openApi: _options?.openApi,
		path: (_subPath: Path, _subOptions?: PathOptions) => {
			const path = (_path + _subPath) as Path
			return createPath(path, _subOptions)
		},
		handler(_handlerOptions) {
			// generate handler
			const _handlerInfo = createHandler(_handlerOptions)

			// add handler to path context
			_handlers.push({
				_id: _handlerInfo._id,
				_method: _handlerOptions.method,
				_middlewares: [],
				_getOpenApiSchemas: _handlerInfo._getOpenApiSchemas,
				_getOpenApiPathItem: _handlerInfo._getOpenApiPathItem,
			})

			// get currently pushed handler
			const currentHandler = _handlers.find(
				(handle) => handle._id === _handlerInfo._id,
			)

			// if currently push handler exist
			if (currentHandler) {
				// 1. add path level middlewares to handler first
				_options?.middlewares?.forEach((middleware) => {
					currentHandler._middlewares.push(middleware)
				})

				// 2. add handler level middlewares
				_handlerInfo._middlewares.forEach((middleware) => {
					currentHandler._middlewares.push(middleware)
				})

				// 3. add handler to path context
				currentHandler._middlewares.push(_handlerInfo._handlerFunc)
			}
		},
	}
}
