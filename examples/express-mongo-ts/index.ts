import express from 'express'
import mongoose from 'mongoose'
import { errorHandler } from 'turtle-express'
import { router } from './routers/v1/router.v1'
import { paths } from './routers/v1/_index'
import 'dotenv/config'

const port = 8080
const app = express()
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
router.setup(app, { paths })

app.use(errorHandler)

const start = async () => {
	try {
		// create env file and add MONGO_URI
		await mongoose.connect(process.env.MONGO_URI as string)
		app.listen(port, () => console.log(`Server listening on port ${port}`))
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

start()
