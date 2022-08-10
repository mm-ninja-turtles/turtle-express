import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	if (err instanceof Error) {
		res.status(500)
		return res.send({
			success: false,
			message: 'Something went wrong!',
			data: null,
			error: err.message,
		})
	}
}
