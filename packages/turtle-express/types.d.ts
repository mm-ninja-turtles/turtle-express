import type { fetch as CFetch } from 'cross-fetch'

declare global {
	export type fetch = typeof CFetch
}
