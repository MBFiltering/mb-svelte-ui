/**
 * String utilities for fuzzy matching and text processing
 */

/**
 * Calculate the Levenshtein distance between two strings.
 * This is the minimum number of single-character edits (insertions, deletions, or substitutions)
 * required to change one string into the other.
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} The edit distance between the two strings
 */
export function levenshteinDistance(a, b) {
	if (a.length === 0) return b.length;
	if (b.length === 0) return a.length;

	const matrix = [];

	// Initialize the first row and column
	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}
	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					matrix[i][j - 1] + 1, // insertion
					matrix[i - 1][j] + 1 // deletion
				);
			}
		}
	}

	return matrix[b.length][a.length];
}

/**
 * Check if a query fuzzy-matches a target string within a given edit distance tolerance.
 * The query can match anywhere within the target (substring matching with typo tolerance).
 * @param {string} query - The search query (typically shorter)
 * @param {string} target - The target string to search in
 * @param {number} maxDistance - Maximum allowed edit distance (default: 1)
 * @returns {boolean} True if the query matches within the tolerance
 */
export function fuzzyMatch(query, target, maxDistance = 1) {
	if (!query || !target) return false;

	const q = query.toLowerCase();
	const t = target.toLowerCase();

	// If query is empty or target is empty, no match
	if (q.length === 0 || t.length === 0) return false;

	// Exact substring match - always succeeds
	if (t.includes(q)) return true;

	// For very short queries (1-2 chars), require exact match to avoid too many false positives
	if (q.length <= 2) return false;

	// For fuzzy matching, we need to check if any substring of the target
	// is within the edit distance of the query
	// We'll check windows of size query.length ± maxDistance
	const minWindow = Math.max(1, q.length - maxDistance);
	const maxWindow = q.length + maxDistance;

	for (let windowSize = minWindow; windowSize <= maxWindow; windowSize++) {
		for (let i = 0; i <= t.length - windowSize; i++) {
			const substring = t.substring(i, i + windowSize);
			const distance = levenshteinDistance(q, substring);
			if (distance <= maxDistance) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Check if a query matches a target string with fuzzy tolerance.
 * Combines exact includes() check with fuzzy matching.
 * @param {string} query - The search query
 * @param {string} target - The target string to search in
 * @param {number} typoTolerance - Maximum typos allowed (default: 1)
 * @returns {boolean} True if matches exactly or within typo tolerance
 */
export function fuzzyIncludes(query, target, typoTolerance = 1) {
	return fuzzyMatch(query, target, typoTolerance);
}
