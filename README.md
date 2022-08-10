# Turtle Express

`turtle-express` is kinda a framework or a library based on `express.js` with an opinionated express router with type safety and schema validation with zod. Also many [more features](https://github.com/mm-ninja-turtles/turtle-express/discussions/7) planning to be included.

[wiki](https://github.com/mm-ninja-turtles/turtle-express/wiki/01.-Getting-Started)

It would be nice to develop with `fastify` like api with `trpc` like type safety for `express.js`.
First class support for `OpenApi` with `Swagger` like UI generation for public facing APIs.
Also support for `api-client-sdk` generation for front-end. And our first final goal is to achieve these features.

## Prerequisites for Contribution

- [pnpm](https://pnpm.js.org/) \*
- knowledge of
  - [typescript](https://www.typescriptlang.org/) \*
  - [express.js](https://expressjs.com/) \*
  - [fastify](https://www.fastify.io/) \*
  - [openapi-generator](https://openapi-generator.tech/) \*
  - [swagger-ui](https://swagger.io/) \*

## How to run the project with examples.

1. `pnpm i`
2. `pnpm run build:watch`
3. `pnpm --filter express-ts run start`

## Contributing

1. Create a new branch with bug fix or feature. eg. `bug-fix-123` or `feature-123`
2. Must commit your changes with `pnpm run commit`.
3. Push your changes and Create a pull request.
