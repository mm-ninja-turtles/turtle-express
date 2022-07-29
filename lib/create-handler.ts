import type { RequestHandler } from 'express'
import type { SomeZodObject } from 'zod'
import type { Method } from './types'

export interface HandlerMeta {
  method: Method
  handler: RequestHandler
}

export interface HandlerOptions {
  method: Method
  response: SomeZodObject
  resolver: Resolver
}

export type Handler = (options: HandlerOptions) => void

/**
 * Resolver function. Create a express request handler function from `resolver` function.
 */
export type Resolver = <R>() => R | Promise<R>

export function createHandler(options: HandlerOptions): HandlerMeta {
  const { method, resolver } = options

  const handler: RequestHandler = async (req, res) => {
    const result = await resolver()
    res.send(result)
  }

  return { method, handler }
}
