import express from 'express'
import { errorHandler } from 'turtle-express'
import { router } from './src/routers/router.v1'
// import { paths } from ''

const port = 8080
const app = express()

router.setup(app, { paths })

app.use(errorHandler)

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
