export type Path = `/${string}`

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

export type ResolverTypes = 'controlled' | 'uncontrolled'

export type LifeCycleStates =
	| 'idle'
	| 'request_validation'
	| 'resolver'
	| 'resolver_validation'
	| 'before_response'
	| 'final'
