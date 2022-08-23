import { router } from '../router'

export const customResolver = router.path('/custom-resolver')

customResolver.handler({
	id: 'CustomResolverTest',
	method: 'get',
	response: {},
	resolverType: 'uncontrolled',
	resolver({ res }) {
		res.setHeader('Content-Type', 'text/html')
		res.send('<body><h1>Hi</hi></body>')
	},
})

customResolver.handler({
	id: 'CustomResolverTest2',
	method: 'post',
	response: {},
	resolverType: 'uncontrolled',
	resolver({ ctx, res }) {
		return res.send(ctx)
	},
})
