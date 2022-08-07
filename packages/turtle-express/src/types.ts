import type { ZodType } from 'zod'

/** HTTP request Methods */
export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
// | 'head' | 'options' | 'all'

/**
 * Response Object with Http Status Code references
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export interface ResponseShape<
  // #region ResponseShape Http Status Code Generics
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
  // INFORMATION RESPONSES
  /**
   * **100: Continue**
   *
   * This interim response indicates that the client should continue
   * the request or ignore the response if the request is already finished.
   */
  100?: R100
  /**
   * **101: Switching Protocols**
   *
   * This code is sent in response to an
   * [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade)
   * request header from the client and indicates the protocol the server is switching to.
   */
  101?: R101
  /**
   * **102: Processing ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * This code indicates that the server has received and
   * is processing the request, but no response is available yet.
   */
  102?: R102
  /**
   * **103: Early Hints**
   *
   * This status code is primarily intended to be used with the
   * [Link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link)
   * header, letting the user agent start
   * [preloading](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)
   * resources while the server prepares a response.
   *
   * @deprecated Experimental feature. Expected behavior to change in the future. Currently deprecated
   */
  103?: R103

  // ==========================

  // SUCCESSFUL RESPONSES
  /**
   * **200: OK**
   *
   * The request succeeded. The result meaning of "success" depends on the HTTP method:
   *
   * - `GET`: The resource has been fetched and transmitted in the message body.
   * - `HEAD`: The representation headers are included in the response without any message body.
   * - `PUT` or `POST`: The resource describing the result of the action is transmitted in the message body.
   * - `TRACE`: The message body contains the request message as received by the server.
   */
  200?: R200
  /**
   * **201: Created**
   *
   * The request succeeded, and a new resource was created as a result.
   * This is typically the response sent after POST requests, or some PUT requests.
   */
  201?: R201
  /**
   * **202: Accepted**
   *
   * The request has been received but not yet acted upon.
   * It is noncommittal, since there is no way in HTTP to later
   * send an asynchronous response indicating the outcome of the request.
   * It is intended for cases where another process or server handles
   * the request, or for batch processing.
   */
  202?: R202
  /**
   * **203: Non-Authoritative Information**
   *
   * This response code means the returned metadata is not exactly
   * the same as is available from the origin server, but is collected
   * from a local or a third-party copy. This is mostly used for
   * mirrors or backups of another resource. Except for that specific case,
   * the 200 OK response is preferred to this status.
   */
  203?: R203
  /**
   * **204: No Content**
   *
   * There is no content to send for this request, but the headers may be useful.
   * The user agent may update its cached headers for this resource with the new ones.
   */
  204?: R204
  /**
   * **205: Reset Content**
   *
   * Tells the user agent to reset the document which sent this request.
   */
  205?: R205
  /**
   * **206: Partial Content**
   *
   * This response code is used when the
   * [Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
   * header is sent from the client to request only part of a resource.
   */
  206?: R206
  /**
   * **207: Multi-Status ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * Conveys information about multiple resources, for situations where
   * multiple status codes might be appropriate.
   */
  207?: R207
  /**
   * **208: Already Reported ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * Used inside a `<dav:propstat>` response element to avoid repeatedly
   * enumerating the internal members of multiple bindings to the same collection.
   */
  208?: R208
  /**
   * **226: IM Used ([HTTP Delta encoding](https://datatracker.ietf.org/doc/html/rfc3229))**
   *
   * The server has fulfilled a GET request for the resource, and the response
   * is a representation of the result of one or more instance-manipulations
   * applied to the current instance.
   */
  226?: R226

  // ==========================

  // REDIRECTION RESPONSES
  /**
   * **300: Multiple Choices**
   *
   * The request has more than one possible response.
   * The user agent or user should choose one of them.
   * (There is no standardized way of choosing one of the responses,
   * but HTML links to the possibilities are recommended so the user can pick.)
   */
  300?: R300
  /**
   * **301: Moved Permanently**
   *
   * The URL of the requested resource has been changed permanently.
   * The new URL is given in the response.
   */
  301?: R301
  /**
   * **302: Found**
   *
   * This response code means that the URI of requested resource has been changed temporarily.
   * Further changes in the URI might be made in the future.
   * Therefore, this same URI should be used by the client in future requests.
   */
  302?: R302
  /**
   * **303: See Other**
   *
   * The server sent this response to direct the client to get the requested resource
   * at another URI with a `GET` request.
   */
  303?: R303
  /**
   * **304: Not Modified**
   *
   * This is used for caching purposes. It tells the client that the response
   * has not been modified, so the client can continue to use the same cached
   * version of the response.
   */
  304?: R304
  /**
   * **305: Use Proxy**
   *
   * Defined in a previous version of the HTTP specification to indicate that
   * a requested response must be accessed by a proxy. It has been deprecated
   * due to security concerns regarding in-band configuration of a proxy.
   */
  305?: R305
  /**
   * **306: unused**
   *
   * This response code is no longer used; it is just reserved. It was used
   * in a previous version of the HTTP/1.1 specification.
   * @deprecated
   */
  306?: R306
  /**
   * **307: Temporary Redirect**
   *
   * The server sends this response to direct the client to get the requested
   * resource at another URI with same method that was used in the prior request.
   * This has the same semantics as the 302 Found HTTP response code, with the
   * exception that the user agent must not change the HTTP method used:
   * if a `POST` was used in the first request, a `POST` must be used in the second request.
   */
  307?: R307
  /**
   * **308: Permanent Redirect**
   *
   * This means that the resource is now permanently located at another URI,
   * specified by the Location: HTTP Response header. This has the same semantics
   * as the 301 Moved Permanently HTTP response code, with the exception that
   * the user agent must not change the HTTP method used: if a POST was used
   * in the first request, a POST must be used in the second request.
   */
  308?: R308

  // ==========================

  // CLIENT ERROR RESPONSES
  /**
   * **400: Bad Request**
   *
   * The server cannot or will not process the request due to something that
   * is perceived to be a client error (e.g., malformed request syntax, invalid
   * request message framing, or deceptive request routing).
   */
  400?: R400
  /**
   * **401: Unauthorized**
   *
   * Although the HTTP standard specifies "unauthorized", semantically this
   * response means "unauthenticated". That is, the client must authenticate
   * itself to get the requested response.
   */
  401?: R401
  /**
   * **402: Payment Required**
   *
   * This response code is reserved for future use. The initial aim for creating
   * this code was using it for digital payment systems, however this status code
   * is used very rarely and no standard convention exists.
   */
  402?: R402
  /**
   * **403: Forbidden**
   *
   * The client does not have access rights to the content; that is,
   * it is unauthorized, so the server is refusing to give the requested resource.
   * Unlike 401 Unauthorized, the client's identity is known to the server.
   */
  403?: R403
  /**
   * **404: Not Found**
   *
   * The server can not find the requested resource. In the browser, this means
   * the URL is not recognized. In an API, this can also mean that the endpoint
   * is valid but the resource itself does not exist. Servers may also send this
   * response instead of 403 Forbidden to hide the existence of a resource from
   * an unauthorized client. This response code is probably the most well known
   * due to its frequent occurrence on the web.
   */
  404?: R404
  /**
   * **405: Method Not Allowed**
   *
   * The request method is known by the server but is not supported by the target
   * resource. For example, an API may not allow calling `DELETE` to remove a resource.
   */
  405?: R405
  /**
   * **406: Not Acceptable**
   *
   * This response is sent when the web server, after performing
   * [server-driven content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation#server-driven_negotiation)
   * , doesn't find any content that conforms to the criteria given by the user agent.
   */
  406?: R406
  /**
   * **407: Proxy Authentication Required**
   *
   * This is similar to `401 Unauthorized` but authentication is needed to be done by a proxy.
   */
  407?: R407
  /**
   * **408: Request Timeout**
   *
   * This response is sent on an idle connection by some servers, even without
   * any previous request by the client. It means that the server would like
   * to shut down this unused connection. This response is used much more since some browsers,
   * like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up
   * surfing. Also note that some servers merely shut down the connection without
   * sending this message.
   */
  408?: R408
  /**
   * **409: Conflict**
   *
   * This response is sent when a request conflicts with the current state of the server.
   */
  409?: R409
  /**
   * **410: Gone**
   *
   * This response is sent when the requested content has been permanently deleted
   * from server, with no forwarding address. Clients are expected to remove their
   * caches and links to the resource. The HTTP specification intends this status code
   * to be used for "limited-time, promotional services". APIs should not feel compelled
   * to indicate resources that have been deleted with this status code.
   */
  410?: R410
  /**
   * **411: Length Required**
   *
   * Server rejected the request because the `Content-Length` header field
   * is not defined and the server requires it.
   */
  411?: R411
  /**
   * **412: Precondition Failed**
   *
   * The client has indicated preconditions in its headers which the server does not meet.
   */
  412?: R412
  /**
   * **413: Payload Too Large**
   *
   * Request entity is larger than limits defined by server. The server might
   * close the connection or return an Retry-After header field.
   */
  413?: R413
  /**
   * **414: URI Too Long**
   *
   * The URI requested by the client is longer than the server is willing to interpret.
   */
  414?: R414
  /**
   * **415: Unsupported Media Type**
   *
   * The media format of the requested data is not supported by the server,
   * so the server is rejecting the request.
   */
  415?: R415
  /**
   * **416: Range Not Satisfiable**
   *
   * The range specified by the `Range` header field in the request cannot be fulfilled.
   * It's possible that the range is outside the size of the target URI's data.
   */
  416?: R416
  /**
   * **417: Expectation Failed**
   *
   * This response code means the expectation indicated by the Expect request header
   * field cannot be met by the server.
   */
  417?: R417
  /**
   * **418: I'm a teapot**
   *
   * The server refuses the attempt to brew coffee with a teapot.
   */
  418?: R418
  /**
   * **421: Misdirected Request**
   *
   * The request was directed at a server that is not able to produce a response.
   * This can be sent by a server that is not configured to produce responses for
   * the combination of scheme and authority that are included in the request URI.
   */
  421?: R421
  /**
   * **422: Unprocessable Entity ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  422?: R422
  /**
   * **423: Locked ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * The resource that is being accessed is locked.
   */
  423?: R423
  /**
   * **424: Failed Dependency ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * The request failed due to failure of a previous request.
   */
  424?: R424
  /**
   * **425: Too Early**
   *
   * Indicates that the server is unwilling to risk processing a request that might be replayed.
   *
   * @deprecated Experimental feature. Expected behavior to change in the future. Currently deprecated.
   */
  425?: R425
  /**
   * **426: Upgrade Required**
   *
   * The server refuses to perform the request using the current protocol but might be
   * willing to do so after the client upgrades to a different protocol. The server sends an
   * [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade)
   * header in a 426 response to indicate the required protocol(s).
   */
  426?: R426
  /**
   * **428: Precondition Required**
   *
   * The origin server requires the request to be conditional. This response is intended
   * to prevent the 'lost update' problem, where a client `GET`s a resource's state, modifies
   * it and `PUT`s it back to the server, when meanwhile a third party has modified
   * the state on the server, leading to a conflict.
   */
  428?: R428
  /**
   * **429: Too Many Requests**
   *
   * The user has sent too many requests in a given amount of time ("rate limiting").
   */
  429?: R429
  /**
   * **431: Request Header Fields Too Large**
   *
   * The server is unwilling to process the request because its header fields are too large.
   * The request may be resubmitted after reducing the size of the request header fields.
   */
  431?: R431
  /**
   * **451: Unavailable For Legal Reasons**
   *
   * The user agent requested a resource that cannot legally be provided,
   * such as a web page censored by a government.
   */
  451?: R451

  // ============================

  // SERVER ERROR RESPONSES
  /**
   * **500: Internal Server Error**
   *
   * The server has encountered a situation it does not know how to handle.
   */
  500?: R500
  /**
   * **501: Not Implemented**
   *
   * The request method is not supported by the server and cannot be handled.
   * The only methods that servers are required to support (and therefore that
   * must not return this code) are `GET` and `HEAD`.
   */
  501?: R501
  /**
   * **502: Bad Gateway**
   *
   * This error response means that the server, while working as a gateway to get
   * a response needed to handle the request, got an invalid response.
   */
  502?: R502
  /**
   * **503: Service Unavailable**
   *
   * The server is not ready to handle the request. Common causes are a server that
   * is down for maintenance or that is overloaded. Note that together with this response,
   * a user-friendly page explaining the problem should be sent. This response should be
   * used for temporary conditions and the `Retry-After` HTTP header should, if possible,
   * contain the estimated time before the recovery of the service. The webmaster must
   * also take care about the caching-related headers that are sent along with this response,
   * as these temporary condition responses should usually not be cached.
   */
  503?: R503
  /**
   * **504: Gateway Timeout**
   *
   * This error response is given when the server is acting as a gateway and cannot get
   * a response in time.
   */
  504?: R504
  /**
   * **505: HTTP Version Not Supported**
   *
   * The HTTP version used in the request is not supported by the server.
   */
  505?: R505
  /**
   * **506: Variant Also Negotiates**
   *
   * The server has an internal configuration error: the chosen variant resource is
   * configured to engage in transparent content negotiation itself, and is therefore
   * not a proper end point in the negotiation process.
   */
  506?: R506
  /**
   * **507: Insufficient Storage ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * The method could not be performed on the resource because the server is unable
   * to store the representation needed to successfully complete the request.
   */
  507?: R507
  /**
   * **508: Loop Detected ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * The server detected an infinite loop while processing the request.
   */
  508?: R508
  /**
   * **510: Not Extended**
   *
   * Further extensions to the request are required for the server to fulfill it.
   */
  510?: R510
  /**
   * **511: Network Authentication Required**
   *
   * Indicates that the client needs to authenticate to gain network access.
   */
  511?: R511
}
