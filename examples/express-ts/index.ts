import express,{ Router } from 'express'
import { createRouter, createPath } from 'bulbasaur-express'

const port = 8080
const app = express()
const _router = Router()

const router = createRouter(_router)

const hello = createPath(_router, '/hello')
hello.handler({
  method: 'get',
  resolver() {
    return 'Hello World!' as any
  }
})

router.setup(app, {
  paths: [hello.meta]
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
