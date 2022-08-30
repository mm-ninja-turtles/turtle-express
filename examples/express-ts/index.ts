import express from 'express'
import { errorHandler } from 'turtle-express'
import { router } from './router'
import { paths } from './paths/_index'

const port = 8080
const app = express()
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
router.setup(app, { paths })

app.use(errorHandler)

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
