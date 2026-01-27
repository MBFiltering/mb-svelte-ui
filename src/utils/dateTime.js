/**
 * dateTime.js - Date and time formatting utilities
 *
 * Generic helpers for formatting dates and calculating relative time strings.
 */

/**
 * Parse a date string that may be in various formats
 * Handles both ISO format and "YYYY-MM-DD HH:MM:SS" format
 * @param {string} dateStr - The date string to parse
 * @returns {Date|null} - Parsed Date object or null if invalid
 */
export function parseDate(dateStr) {
	if (!dateStr) return null;

	try {
		// Handle "YYYY-MM-DD HH:MM:SS" format by converting to ISO
		const normalized = dateStr.includes(' ') ? dateStr.replace(' ', 'T') : dateStr;
		const date = new Date(normalized);

		if (isNaN(date.getTime())) return null;
		return date;
	} catch {
		return null;
	}
}

/**
 * Check if a date string represents a "zero" or empty date
 * Common patterns: "0000-00-00", "0000-00-00 00:00:00"
 * @param {string} dateStr - The date string to check
 * @returns {boolean} - True if the date is a zero/empty date
 */
export function isZeroDate(dateStr) {
	if (!dateStr) return true;
	return dateStr.startsWith('0000-00-00');
}

/**
 * Format a date string for display
 * Converts "YYYY-MM-DD HH:MM:SS" to readable format like "January 15, 2026"
 * @param {string} dateStr - The date string to format
 * @param {Object} options - Intl.DateTimeFormat options (defaults to long format)
 * @returns {string|null} - Formatted date string or null if invalid
 */
export function formatDate(dateStr, options = {}) {
	if (isZeroDate(dateStr)) return null;

	const date = parseDate(dateStr);
	if (!date) return null;

	const defaultOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		...options
	};

	return date.toLocaleDateString('en-US', defaultOptions);
}

/**
 * Format a date string with time
 * @param {string} dateStr - The date string to format
 * @returns {string|null} - Formatted date/time string or null if invalid
 */
export function formatDateTime(dateStr) {
	if (isZeroDate(dateStr)) return null;

	const date = parseDate(dateStr);
	if (!date) return null;

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	});
}

/**
 * Format a date as short format (e.g., "Jan 15, 2026")
 * @param {string} dateStr - The date string to format
 * @returns {string|null} - Formatted date string or null if invalid
 */
export function formatDateShort(dateStr) {
	return formatDate(dateStr, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

/**
 * Get relative time string (e.g., "in 3 weeks", "2 days ago")
 * @param {string} dateStr - The date string to compare against now
 * @returns {string|null} - Relative time string or null if invalid
 */
export function getRelativeTime(dateStr) {
	if (isZeroDate(dateStr)) return null;

	const date = parseDate(dateStr);
	if (!date) return null;

	const now = new Date();
	const diffMs = date.getTime() - now.getTime();
	const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays < 0) {
		// Past date
		const absDays = Math.abs(diffDays);
		if (absDays === 0) return 'today';
		if (absDays === 1) return 'yesterday';
		if (absDays < 7) return `${absDays} days ago`;
		if (absDays < 14) return '1 week ago';
		if (absDays < 30) return `${Math.round(absDays / 7)} weeks ago`;
		if (absDays < 60) return '1 month ago';
		if (absDays < 365) return `${Math.round(absDays / 30)} months ago`;
		return `${Math.round(absDays / 365)} years ago`;
	} else {
		// Future date
		if (diffDays === 0) return 'today';
		if (diffDays === 1) return 'in 1 day';
		if (diffDays < 7) return `in ${diffDays} days`;
		if (diffDays < 14) return 'in 1 week';
		if (diffDays < 30) return `in ${Math.round(diffDays / 7)} weeks`;
		if (diffDays < 60) return 'in 1 month';
		if (diffDays < 365) return `in ${Math.round(diffDays / 30)} months`;
		return `in ${Math.round(diffDays / 365)} years`;
	}
}

/**
 * Get time elapsed since a date (always past tense)
 * @param {string} dateStr - The date string
 * @returns {string|null} - Elapsed time string or null if invalid
 */
export function getTimeElapsed(dateStr) {
	if (isZeroDate(dateStr)) return null;

	const date = parseDate(dateStr);
	if (!date) return null;

	const now = new Date();
	const diffMs = now.getTime() - date.getTime();

	if (diffMs < 0) return null; // Future date

	const diffSeconds = Math.floor(diffMs / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffSeconds < 60) return 'just now';
	if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
	if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
	if (diffDays === 1) return 'yesterday';
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 14) return '1 week ago';
	if (diffDays < 30) return `${Math.round(diffDays / 7)} weeks ago`;
	if (diffDays < 60) return '1 month ago';
	if (diffDays < 365) return `${Math.round(diffDays / 30)} months ago`;
	return `${Math.round(diffDays / 365)} years ago`;
}

/**
 * Format a billing date (alias for formatDate, kept for backward compatibility)
 * @param {string} dateStr - The date string to format
 * @returns {string|null} - Formatted date string or null if invalid
 */
export function formatBillingDate(dateStr) {
	return formatDate(dateStr);
}
