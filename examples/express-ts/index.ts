import express from 'express'
import { router } from './router'
import { paths } from './paths/_index'

const port = 8080
const app = express()

router.setup(app, { paths })

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
