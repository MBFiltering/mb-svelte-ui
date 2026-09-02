/**
 * Superforms (and similar) expose field errors as `string | string[]`.
 * Show one message: the first non-empty string. Missing/empty becomes undefined
 * so the caller can treat it as a boolean.
 *
 * @param {unknown} error
 * @returns {string | undefined}
 */
export function firstError(error) {
	if (error == null || error === false) return undefined;
	if (Array.isArray(error)) {
		for (const item of error) {
			if (typeof item === 'string' && item.length > 0) return item;
		}
		return undefined;
	}
	if (typeof error === 'string' && error.length > 0) return error;
	return undefined;
}
