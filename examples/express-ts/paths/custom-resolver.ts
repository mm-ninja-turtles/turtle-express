import { router } from '../router'

export const customResolver = router.path('/custom-resolver')

customResolver.handler({
	method: 'get',
	uncontrolledResolver: true,
	resolver({ res }) {
		res.setHeader('Content-Type', 'text/html')
		res.send('<body><h1>Hi</hi></body>')
	},
})

customResolver.handler({
	method: 'post',
	resolver({ ctx }) {
		return {
			200: ctx,
		}
	},
})
