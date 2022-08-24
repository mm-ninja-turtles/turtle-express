import { router } from '../../router.v1'
import {
	findAllUsersQuery,
	findAllUsersResponse,
	findAllUsersResolver,
} from '../../../controllers/v1/users/find-all-users.controller'
import {
	createUsersBody,
	createUsersResolver,
	createUsersResponse,
} from '../../../controllers/v1/users/create-users.controller'

export const users = router.path('/users')

users.handler({
	id: 'FindAllUsers',
	method: 'get',
	request: {
		query: findAllUsersQuery,
	},
	response: findAllUsersResponse,
	resolver: findAllUsersResolver,
})

users.handler({
	id: 'CreateUser',
	method: 'post',
	request: {
		body: createUsersBody,
	},
	response: createUsersResponse,
	resolver: createUsersResolver,
})
