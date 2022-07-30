import type { RequestHandler } from 'express'
import type { z, ZodType } from 'zod'
import type { Method, ResponseShape } from './types'

export interface HandlerMeta {
  method: Method
  handler: RequestHandler
}

/**
 * ### HandlerOptions interface explanation.
 *
 * ```bash
 * # Note:
 * #
 * # `ResponseShape` will infer back any `ZodType` data type.
 * # This is the crucial concept to understand how `resolver` function refer
 * # back the `response` shape as it's return data type.
 * ```
 *
 * ```ts
 * interface HandlerOptions<
 *   ...,
 *   R200 extends ZodType,
 *   R201 extends ZodType,
 *   ...
 * > {
 *   method: Method
 *   // by passing Generics to the Response Shape without `zod` infer,
 *   // it can represent as a `Zod` schema, which will then use as
 *   // validation schema internally.
 *   response: ResponseShape<..., R200, R201, ...>
 *   // by passing Generics to the Response Shape with `zod` infer,
 *   // it can represent as a pure `Zod` shape, which will then use as
 *   // actual data to response back.
 *   resolver: () => ResponseShape<..., z.infer<R200>, z.infer<R201>, ...>
 * }
 * ```
 */
export interface HandlerOptions<
  // #region HandlerOptions Http Status Code Generics
  // INFORMATION RESPONSES
  R100 extends ZodType,
  R101 extends ZodType,
  R102 extends ZodType,
  R103 extends ZodType,
  // SUCCESSFUL RESPONSES
  R200 extends ZodType,
  R201 extends ZodType,
  R202 extends ZodType,
  R203 extends ZodType,
  R204 extends ZodType,
  R205 extends ZodType,
  R206 extends ZodType,
  R207 extends ZodType,
  R208 extends ZodType,
  R226 extends ZodType,
  // REDIRECTION MESSAGES
  R300 extends ZodType,
  R301 extends ZodType,
  R302 extends ZodType,
  R303 extends ZodType,
  R304 extends ZodType,
  R305 extends ZodType,
  R306 extends ZodType,
  R307 extends ZodType,
  R308 extends ZodType,
  // CLIENT ERROR RESPONSES
  R400 extends ZodType,
  R401 extends ZodType,
  R402 extends ZodType,
  R403 extends ZodType,
  R404 extends ZodType,
  R405 extends ZodType,
  R406 extends ZodType,
  R407 extends ZodType,
  R408 extends ZodType,
  R409 extends ZodType,
  R410 extends ZodType,
  R411 extends ZodType,
  R412 extends ZodType,
  R413 extends ZodType,
  R414 extends ZodType,
  R415 extends ZodType,
  R416 extends ZodType,
  R417 extends ZodType,
  R418 extends ZodType,
  R421 extends ZodType,
  R422 extends ZodType,
  R423 extends ZodType,
  R424 extends ZodType,
  R425 extends ZodType,
  R426 extends ZodType,
  R428 extends ZodType,
  R429 extends ZodType,
  R431 extends ZodType,
  R451 extends ZodType,
  // SERVER ERROR RESPONSES
  R500 extends ZodType,
  R501 extends ZodType,
  R502 extends ZodType,
  R503 extends ZodType,
  R504 extends ZodType,
  R505 extends ZodType,
  R506 extends ZodType,
  R507 extends ZodType,
  R508 extends ZodType,
  R510 extends ZodType,
  R511 extends ZodType,
  // #endregion
> {
  method: Method
  response: ResponseShape<
    // #region Http Status Code Generics
    // INFORMATION RESPONSES
    R100,
    R101,
    R102,
    R103,
    // SUCCESSFUL RESPONSES
    R200,
    R201,
    R202,
    R203,
    R204,
    R205,
    R206,
    R207,
    R208,
    R226,
    // REDIRECTION MESSAGES
    R300,
    R301,
    R302,
    R303,
    R304,
    R305,
    R306,
    R307,
    R308,
    // CLIENT ERROR RESPONSES
    R400,
    R401,
    R402,
    R403,
    R404,
    R405,
    R406,
    R407,
    R408,
    R409,
    R410,
    R411,
    R412,
    R413,
    R414,
    R415,
    R416,
    R417,
    R418,
    R421,
    R422,
    R423,
    R424,
    R425,
    R426,
    R428,
    R429,
    R431,
    R451,
    // SERVER ERROR RESPONSES
    R500,
    R501,
    R502,
    R503,
    R504,
    R505,
    R506,
    R507,
    R508,
    R510,
    R511
    // #endregion
  >
  resolver: () =>
    | ResponseShape<
        // #region Http Status Code Generics
        // INFORMATION RESPONSES
        z.infer<R100>,
        z.infer<R101>,
        z.infer<R102>,
        z.infer<R103>,
        // SUCCESSFUL RESPONSES
        z.infer<R200>,
        z.infer<R201>,
        z.infer<R202>,
        z.infer<R203>,
        z.infer<R204>,
        z.infer<R205>,
        z.infer<R206>,
        z.infer<R207>,
        z.infer<R208>,
        z.infer<R226>,
        // REDIRECTION MESSAGES
        z.infer<R300>,
        z.infer<R301>,
        z.infer<R302>,
        z.infer<R303>,
        z.infer<R304>,
        z.infer<R305>,
        z.infer<R306>,
        z.infer<R307>,
        z.infer<R308>,
        // CLIENT ERROR RESPONSES
        z.infer<R400>,
        z.infer<R401>,
        z.infer<R402>,
        z.infer<R403>,
        z.infer<R404>,
        z.infer<R405>,
        z.infer<R406>,
        z.infer<R407>,
        z.infer<R408>,
        z.infer<R409>,
        z.infer<R410>,
        z.infer<R411>,
        z.infer<R412>,
        z.infer<R413>,
        z.infer<R414>,
        z.infer<R415>,
        z.infer<R416>,
        z.infer<R417>,
        z.infer<R418>,
        z.infer<R421>,
        z.infer<R422>,
        z.infer<R423>,
        z.infer<R424>,
        z.infer<R425>,
        z.infer<R426>,
        z.infer<R428>,
        z.infer<R429>,
        z.infer<R431>,
        z.infer<R451>,
        // SERVER ERROR RESPONSES
        z.infer<R500>,
        z.infer<R501>,
        z.infer<R502>,
        z.infer<R503>,
        z.infer<R504>,
        z.infer<R505>,
        z.infer<R506>,
        z.infer<R507>,
        z.infer<R508>,
        z.infer<R510>,
        z.infer<R511>
        // #endregion
      >
    | Promise<
        ResponseShape<
          // #region Http Status Code Generics
          // INFORMATION RESPONSES
          z.infer<R100>,
          z.infer<R101>,
          z.infer<R102>,
          z.infer<R103>,
          // SUCCESSFUL RESPONSES
          z.infer<R200>,
          z.infer<R201>,
          z.infer<R202>,
          z.infer<R203>,
          z.infer<R204>,
          z.infer<R205>,
          z.infer<R206>,
          z.infer<R207>,
          z.infer<R208>,
          z.infer<R226>,
          // REDIRECTION MESSAGES
          z.infer<R300>,
          z.infer<R301>,
          z.infer<R302>,
          z.infer<R303>,
          z.infer<R304>,
          z.infer<R305>,
          z.infer<R306>,
          z.infer<R307>,
          z.infer<R308>,
          // CLIENT ERROR RESPONSES
          z.infer<R400>,
          z.infer<R401>,
          z.infer<R402>,
          z.infer<R403>,
          z.infer<R404>,
          z.infer<R405>,
          z.infer<R406>,
          z.infer<R407>,
          z.infer<R408>,
          z.infer<R409>,
          z.infer<R410>,
          z.infer<R411>,
          z.infer<R412>,
          z.infer<R413>,
          z.infer<R414>,
          z.infer<R415>,
          z.infer<R416>,
          z.infer<R417>,
          z.infer<R418>,
          z.infer<R421>,
          z.infer<R422>,
          z.infer<R423>,
          z.infer<R424>,
          z.infer<R425>,
          z.infer<R426>,
          z.infer<R428>,
          z.infer<R429>,
          z.infer<R431>,
          z.infer<R451>,
          // SERVER ERROR RESPONSES
          z.infer<R500>,
          z.infer<R501>,
          z.infer<R502>,
          z.infer<R503>,
          z.infer<R504>,
          z.infer<R505>,
          z.infer<R506>,
          z.infer<R507>,
          z.infer<R508>,
          z.infer<R510>,
          z.infer<R511>
          // #endregion
        >
      >
}

export const createHandler = <
  // #region HandlerOptions Http Status Code Generics
  // INFORMATION RESPONSES
  R100 extends ZodType,
  R101 extends ZodType,
  R102 extends ZodType,
  R103 extends ZodType,
  // SUCCESSFUL RESPONSES
  R200 extends ZodType,
  R201 extends ZodType,
  R202 extends ZodType,
  R203 extends ZodType,
  R204 extends ZodType,
  R205 extends ZodType,
  R206 extends ZodType,
  R207 extends ZodType,
  R208 extends ZodType,
  R226 extends ZodType,
  // REDIRECTION MESSAGES
  R300 extends ZodType,
  R301 extends ZodType,
  R302 extends ZodType,
  R303 extends ZodType,
  R304 extends ZodType,
  R305 extends ZodType,
  R306 extends ZodType,
  R307 extends ZodType,
  R308 extends ZodType,
  // CLIENT ERROR RESPONSES
  R400 extends ZodType,
  R401 extends ZodType,
  R402 extends ZodType,
  R403 extends ZodType,
  R404 extends ZodType,
  R405 extends ZodType,
  R406 extends ZodType,
  R407 extends ZodType,
  R408 extends ZodType,
  R409 extends ZodType,
  R410 extends ZodType,
  R411 extends ZodType,
  R412 extends ZodType,
  R413 extends ZodType,
  R414 extends ZodType,
  R415 extends ZodType,
  R416 extends ZodType,
  R417 extends ZodType,
  R418 extends ZodType,
  R421 extends ZodType,
  R422 extends ZodType,
  R423 extends ZodType,
  R424 extends ZodType,
  R425 extends ZodType,
  R426 extends ZodType,
  R428 extends ZodType,
  R429 extends ZodType,
  R431 extends ZodType,
  R451 extends ZodType,
  // SERVER ERROR RESPONSES
  R500 extends ZodType,
  R501 extends ZodType,
  R502 extends ZodType,
  R503 extends ZodType,
  R504 extends ZodType,
  R505 extends ZodType,
  R506 extends ZodType,
  R507 extends ZodType,
  R508 extends ZodType,
  R510 extends ZodType,
  R511 extends ZodType,
  // #endregion
>(
  options: HandlerOptions<
    // #region Http Status Code Generics
    // INFORMATION RESPONSES
    R100,
    R101,
    R102,
    R103,
    // SUCCESSFUL RESPONSES
    R200,
    R201,
    R202,
    R203,
    R204,
    R205,
    R206,
    R207,
    R208,
    R226,
    // REDIRECTION MESSAGES
    R300,
    R301,
    R302,
    R303,
    R304,
    R305,
    R306,
    R307,
    R308,
    // CLIENT ERROR RESPONSES
    R400,
    R401,
    R402,
    R403,
    R404,
    R405,
    R406,
    R407,
    R408,
    R409,
    R410,
    R411,
    R412,
    R413,
    R414,
    R415,
    R416,
    R417,
    R418,
    R421,
    R422,
    R423,
    R424,
    R425,
    R426,
    R428,
    R429,
    R431,
    R451,
    // SERVER ERROR RESPONSES
    R500,
    R501,
    R502,
    R503,
    R504,
    R505,
    R506,
    R507,
    R508,
    R510,
    R511
    // #endregion
  >,
): HandlerMeta => {
  // extract handler options fields
  const { method, resolver, response } = options

  // handler function
  const handler: RequestHandler = async (req, res) => {
    // run the resolver function from `options`
    const result = await resolver()

    // get the first entry as a result
    const firstEntryKey = parseInt(
      Object.keys(result)[0],
    ) as keyof ResponseShape<
      // #region Http Status Code Generics
      // INFORMATION RESPONSES
      R100,
      R101,
      R102,
      R103,
      // SUCCESSFUL RESPONSES
      R200,
      R201,
      R202,
      R203,
      R204,
      R205,
      R206,
      R207,
      R208,
      R226,
      // REDIRECTION MESSAGES
      R300,
      R301,
      R302,
      R303,
      R304,
      R305,
      R306,
      R307,
      R308,
      // CLIENT ERROR RESPONSES
      R400,
      R401,
      R402,
      R403,
      R404,
      R405,
      R406,
      R407,
      R408,
      R409,
      R410,
      R411,
      R412,
      R413,
      R414,
      R415,
      R416,
      R417,
      R418,
      R421,
      R422,
      R423,
      R424,
      R425,
      R426,
      R428,
      R429,
      R431,
      R451,
      // SERVER ERROR RESPONSES
      R500,
      R501,
      R502,
      R503,
      R504,
      R505,
      R506,
      R507,
      R508,
      R510,
      R511
      // #endregion
    >
    const firstEntry = result[firstEntryKey]

    // if response schema is provided, validate the result
    const safeResult = response[firstEntryKey]?.safeParse(firstEntry)

    // status code to response back
    let statusCode = firstEntryKey

    // if schema validation failed and status code is not
    // error codes which is less than 400 code,
    // then set status code to 400 as it's a validation error
    if (statusCode < 400 && safeResult?.success === false) statusCode = 400
    // change success status to false if result key status is
    // greater than or equal to 400
    else if (safeResult && firstEntryKey >= 400) safeResult.success = false

    // response with the safe parsed result
    res.status(statusCode).send(safeResult)
  }

  return { method, handler }
}
