/**
 * Return `typed` object keys as array.
 * Source from [matt pocock](https://www.youtube.com/watch?v=GW00zebIt0g)
 */
export function ObjectKeys<Obj>(obj: Obj): Array<keyof Obj> {
	return Object.keys(obj) as Array<keyof Obj>
}
