export const handlerFuncSteps = {
	context: {
		guardResult: { pass: true, response: undefined as any },
		requestValidation: {
			pass: true,
			response: {
				params: undefined as any,
				query: undefined as any,
				body: undefined as any,
			},
		},
		paramsValidation: {
			success: true,
			data: undefined as any,
			error: undefined as any,
		},
		queryValidation: {
			success: true,
			data: undefined as any,
			error: undefined as any,
		},
		bodyValidation: {
			success: true,
			data: undefined as any,
			error: undefined as any,
		},
		resolverResult: undefined as any,
		resolverValidation: {
			success: true,
			data: undefined as any,
			error: undefined as any,
		},
		responseInit: {
			statusCode: 500,
			success: false,
			message: 'Server Error. Something went wrong',
			data: undefined as any,
			error: undefined as any,
		},
	},
	steps: {
		S001: {
			name: 'guard',
			on: {
				GUARD_SKIPPED: 'request_validation',
				GUARD_PASSED: 'request_validation',
				GUARD_FAILED: 'before_response',
			},
		},
		S002: {
			name: 'request_validation',
			on: {
				REQUEST_VALIDATION_SKIPPED: 'resolver',
				REQUEST_VALIDATION_PASSED: 'resolver',
				REQUEST_VALIDATION_FAILED: 'before_response',
			},
		},
		S003: {
			name: 'resolver',
			on: {
				UNCONTROLLED_RESOLVER: '_break',
				RESOLVER_DONE: 'resolver_validation',
			},
		},
		S004: {
			name: 'resolver_validation',
			on: {
				RESOLVER_VALIDATION_DONE: 'before_response',
			},
		},
		S005: {
			name: 'before_response',
			type: 'final',
		},
	} as const,
}
