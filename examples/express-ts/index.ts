import express, { Router } from 'express'
import { createRouter } from 'bulbasaur-express'

const port = 8080
const app = express()
const _router = Router()

const router = createRouter(_router)

const hello = router.path('/hello')

hello.handler({
  method: 'get',
  resolver() {
    return 'Hello World!' as any
  },
})

hello.handler({
  method: 'post',
  resolver() {
    return {
      message: 'Hello World! created.',
    } as any
  },
})

const helloWithName = hello.path('/:name')

helloWithName.handler({
  method: 'get',
  resolver() {
    return `Hello Name!` as any
  },
})

router.setup(app, {
  paths: [hello, helloWithName],
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
