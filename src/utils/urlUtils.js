/**
 * urlUtils.js - URL processing and manipulation utilities
 *
 * Helpers for handling URL lists, merging, and building update commands.
 */

// =============================================================================
// URL NORMALIZATION
// =============================================================================

/**
 * Normalize a URL by removing protocol, www prefix, and trailing slashes
 * @param {string} url - The URL to normalize
 * @returns {string} - Normalized URL
 */
export function normalizeUrl(url) {
	if (!url) return '';

	return url
		.toLowerCase()
		.replace(/^https?:\/\//, '') // Remove protocol
		.replace(/^www\./, '') // Remove www prefix
		.replace(/\/+$/, ''); // Remove trailing slashes
}

/**
 * Extract the domain from a URL
 * @param {string} url - The URL to extract domain from
 * @returns {string} - The domain
 */
export function extractDomain(url) {
	const normalized = normalizeUrl(url);
	// Get everything before the first /
	return normalized.split('/')[0];
}

/**
 * Check if a string looks like a valid URL or domain
 * @param {string} str - The string to check
 * @returns {boolean} - True if it looks like a URL/domain
 */
export function isValidUrlOrDomain(str) {
	if (!str || typeof str !== 'string') return false;

	const normalized = normalizeUrl(str);
	if (!normalized) return false;

	// Basic domain pattern: contains at least one dot, no spaces
	return /^[a-z0-9-_.]+\.[a-z]{2,}(\/.*)?$/i.test(normalized);
}

// =============================================================================
// URL LIST PROCESSING
// =============================================================================

/**
 * Merge URL entries that have &-prefixed extension versions
 * The API returns separate entries for "website.com" and "&website.com" (extension entry).
 * This function merges them into a single entry with additional metadata.
 *
 * @param {Array} urlList - Array of URL entries from API { url, state }
 * @returns {Array} - Merged array with { url, state, hasExtensionEntry, extensionState, baseState }
 */
export function mergeUrlEntries(urlList) {
	if (!Array.isArray(urlList)) return [];

	const urlMap = new Map();

	for (const entry of urlList) {
		const url = entry.url;
		const state = entry.state;

		// Check if this is an &-prefixed URL (extension entry)
		if (url.startsWith('&')) {
			const baseUrl = url.slice(1); // Remove the & prefix
			const existing = urlMap.get(baseUrl);

			if (existing) {
				// Merge: extension_excluded takes precedence, store both states
				existing.state = state === 'extension_excluded' ? state : existing.state;
				existing.hasExtensionEntry = true;
				existing.extensionState = state;
			} else {
				// Create new entry for base URL with extension state
				urlMap.set(baseUrl, {
					url: baseUrl,
					state: state,
					hasExtensionEntry: true,
					extensionState: state
				});
			}
		} else {
			// Regular URL
			const existing = urlMap.get(url);

			if (existing) {
				// Merge: keep extension_excluded if it exists
				if (existing.extensionState === 'extension_excluded') {
					existing.state = 'extension_excluded';
				} else {
					existing.state = state;
				}
				existing.baseState = state;
			} else {
				urlMap.set(url, {
					url: url,
					state: state,
					hasExtensionEntry: false,
					baseState: state
				});
			}
		}
	}

	// Sort alphabetically by URL
	return Array.from(urlMap.values()).sort((a, b) => a.url.localeCompare(b.url));
}

/**
 * Build URL update commands for the API
 *
 * When setting a URL state:
 * - 'remove': removes both website.com and &website.com (if exists)
 * - 'extension_excluded': sets website.com to fully_open, &website.com to extension_excluded
 * - any other state: sets website.com to that state, removes &website.com if exists
 *
 * @param {string} baseUrl - The base URL (without & prefix)
 * @param {string} newState - The new state to set ('blocked', 'fully_open', 'mb_filter', 'extension_excluded', 'remove')
 * @param {Object|null} existingItem - The existing URL item from the list (if any)
 * @returns {Array} - Array of update commands { url, state }
 */
export function buildUrlUpdates(baseUrl, newState, existingItem = null) {
	const updates = [];
	const hasExtensionEntry = existingItem?.hasExtensionEntry || false;
	const hasBaseEntry = existingItem ? existingItem.baseState !== undefined : false;

	if (newState === 'remove') {
		// Remove both base and &-prefixed versions if they exist
		if (hasBaseEntry || !hasExtensionEntry) {
			updates.push({ url: baseUrl, state: 'remove' });
		}
		if (hasExtensionEntry) {
			updates.push({ url: '&' + baseUrl, state: 'remove' });
		}
	} else if (newState === 'extension_excluded') {
		// Set base to fully_open (or create it), set &-prefixed to extension_excluded
		updates.push({ url: baseUrl, state: 'fully_open' });
		updates.push({ url: '&' + baseUrl, state: 'extension_excluded' });
	} else {
		// Any other state: set base URL to that state, remove &-prefixed if exists
		updates.push({ url: baseUrl, state: newState });
		if (hasExtensionEntry) {
			updates.push({ url: '&' + baseUrl, state: 'remove' });
		}
	}

	return updates;
}

/**
 * Parse a bulk URL input string into an array of URLs
 * Handles newlines, spaces, and commas as separators
 * Filters out empty strings and normalizes URLs
 *
 * @param {string} input - The bulk input string
 * @returns {Array<string>} - Array of cleaned URLs
 */
export function parseBulkUrls(input) {
	if (!input || typeof input !== 'string') return [];

	return input
		.split(/[\n\s,]+/) // Split by newlines, spaces, or commas
		.map((url) => url.trim())
		.filter((url) => url.length > 0);
}

/**
 * Group URLs by their domain
 * @param {Array} urls - Array of URL strings
 * @returns {Object} - Object with domains as keys, arrays of URLs as values
 */
export function groupUrlsByDomain(urls) {
	const groups = {};

	for (const url of urls) {
		const domain = extractDomain(url);
		if (!groups[domain]) {
			groups[domain] = [];
		}
		groups[domain].push(url);
	}

	return groups;
}

/**
 * Check if a URL matches a pattern (supports wildcards *)
 * @param {string} url - The URL to check
 * @param {string} pattern - The pattern to match against
 * @returns {boolean} - True if matches
 */
export function urlMatchesPattern(url, pattern) {
	const normalizedUrl = normalizeUrl(url);
	const normalizedPattern = normalizeUrl(pattern);

	// Convert wildcard pattern to regex
	const regexPattern = normalizedPattern
		.replace(/[.+?^${}()|[\]\\]/g, '\\$&') // Escape special chars
		.replace(/\*/g, '.*'); // Convert * to .*

	const regex = new RegExp(`^${regexPattern}$`, 'i');
	return regex.test(normalizedUrl);
}
