/** HTTP request Methods */
export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
// | 'head' | 'options' | 'all'

/**
 * Http Status Codes
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export interface HttpStatusCode {
  /**
   * **100: Continue**
   *
   * This interim response indicates that the client should continue
   * the request or ignore the response if the request is already finished.
   */
  100: 'Continue'
  /**
   * **101: Switching Protocols**
   *
   * This code is sent in response to an
   * [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade)
   * request header from the client and indicates the protocol the server is switching to.
   */
  101: 'Switching Protocols'
  /**
   * **102: Processing ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * This code indicates that the server has received and
   * is processing the request, but no response is available yet.
   */
  102: 'Processing'
  /**
   * **103: Early Hints**
   *
   * This status code is primarily intended to be used with the
   * [Link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link)
   * header, letting the user agent start
   * [preloading](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)
   * resources while the server prepares a response.
   */
  103: 'Early Hints'

  // ==========================

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
  200: 'OK'
  /**
   * **201: Created**
   *
   * The request succeeded, and a new resource was created as a result.
   * This is typically the response sent after POST requests, or some PUT requests.
   */
  201: 'Created'
  /**
   * **202: Accepted**
   *
   * The request has been received but not yet acted upon.
   * It is noncommittal, since there is no way in HTTP to later
   * send an asynchronous response indicating the outcome of the request.
   * It is intended for cases where another process or server handles
   * the request, or for batch processing.
   */
  202: 'Accepted'
  /**
   * **203: Non-Authoritative Information**
   *
   * This response code means the returned metadata is not exactly
   * the same as is available from the origin server, but is collected
   * from a local or a third-party copy. This is mostly used for
   * mirrors or backups of another resource. Except for that specific case,
   * the 200 OK response is preferred to this status.
   */
  203: 'Non-Authoritative Information'
  /**
   * **204: No Content**
   *
   * There is no content to send for this request, but the headers may be useful.
   * The user agent may update its cached headers for this resource with the new ones.
   */
  204: 'No Content'
  /**
   * **205: Reset Content**
   *
   * Tells the user agent to reset the document which sent this request.
   */
  205: 'Reset Content'
  /**
   * **206: Partial Content**
   *
   * This response code is used when the
   * [Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
   * header is sent from the client to request only part of a resource.
   */
  206: 'Partial Content'
  /**
   * **207: Multi-Status ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * Conveys information about multiple resources, for situations where
   * multiple status codes might be appropriate.
   */
  207: 'Multi-Status'
  /**
   * **208: Already Reported ([WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV))**
   *
   * Used inside a `<dav:propstat>` response element to avoid repeatedly
   * enumerating the internal members of multiple bindings to the same collection.
   */
  208: 'Already Reported'
  /**
   * **226: IM Used ([HTTP Delta encoding](https://datatracker.ietf.org/doc/html/rfc3229))**
   *
   * The server has fulfilled a GET request for the resource, and the response
   * is a representation of the result of one or more instance-manipulations
   * applied to the current instance.
   */
  226: 'IM Used'

  // ==========================

  /**
   * **300: Multiple Choices**
   *
   * The request has more than one possible response.
   * The user agent or user should choose one of them.
   * (There is no standardized way of choosing one of the responses,
   * but HTML links to the possibilities are recommended so the user can pick.)
   */
  300: 'Multiple Choices'
  301: 301
  302: 302
  303: 303
  304: 304
  305: 305
  306: 306
  307: 307
  308: 308

  400: 400
  401: 401
  402: 402
  403: 403
  404: 404
  405: 405
  406: 406
  407: 407
  408: 408
  409: 409
  410: 410
  411: 411
  412: 412
  413: 413
  414: 414
  415: 415
  416: 416
  417: 417
  418: 418
  421: 421
  422: 422
  423: 423
  424: 424
  426: 426
  428: 428
  429: 429
  431: 431
  451: 451

  500: 500
  501: 501
  502: 502
  503: 503
  504: 504
  505: 505
  506: 506
  507: 507
  508: 508
  510: 510
  511: 511
}
