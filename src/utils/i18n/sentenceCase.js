/**
 * Sentence case for buttons, labels and headings.
 *
 * The house rule is one line of the style guide ("Title Case is for the brand
 * tokens and for nothing else") and, before this, nothing checked it: 40% of
 * portal-svelte's multi-word English phrases were Title Cased against 3% of
 * mb-oauth-portal's, and both spellings then went out for translation, which is
 * where "Page Not Found" and "Page not found" came from.
 *
 * Shared so the four apps apply the same definition of "a label" and the same
 * list of names that keep their capitals.
 */

/** Multi-word names that keep their internal capitals wherever they appear. */
export const NAME_PHRASES = [
	'MB Smart Filtering', 'MB Smart Account', 'MB Smart Technician', 'MB Smart Protect',
	'MB Smart', 'App Shield', 'App Store', 'App Clips', 'Play Store', 'MB Browser',
	'Pro Browser', 'MB Filter', 'MB Protect', 'MB Portal', 'YouTube Pro',
	'YouTube Restricted Mode', 'YouTube Shorts', 'TAG Wiki', 'Master Switch',
	'Apple Account', 'Apple Music', 'Apple News', 'Screen Time', 'Family Controls',
	'Family Sharing', 'Device Owner', 'Find My Device', 'Find My', 'Google Maps',
	'Los Angeles', 'Quick Links', 'App Lookup', 'Site Lookup', 'Terms & Services'
];

/** Single words that are proper nouns anywhere. */
export const NAME_WORDS = new Set([
	'YouTube', 'Apple', 'Google', 'Gmail', 'Safari', 'Chrome', 'Chromebook', 'Chromium',
	'Kiwi', 'Android', 'iOS', 'iPhone', 'iPad', 'iPod', 'Mac', 'macOS', 'Windows', 'Linux',
	'WhatsApp', 'Telegram', 'Shorts', 'WebKit', 'iCloud', 'Siri', 'Spotlight', 'FaceTime',
	'iMessage', 'Netflix', 'Spotify', 'Instagram', 'Facebook', 'Twitter', 'TikTok',
	'Snapchat', 'Discord', 'Reddit', 'Roblox', 'Minecraft', 'Zoom', 'Skype', 'Edge',
	'Firefox', 'Opera', 'Brave', 'Bing', 'DuckDuckGo', 'Yahoo', 'Amazon', 'Stripe',
	'PayPal', 'Cloudflare', 'Reuven', 'Pro', 'Basic', 'Jewish', 'English', 'Spanish',
	'French', 'Hebrew', 'Russian', 'Yiddish', 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
	'Thursday', 'Friday', 'Saturday', 'January', 'February', 'March', 'April', 'May',
	'June', 'July', 'August', 'September', 'October', 'November', 'December'
]);

/** Namespaces carrying an external taxonomy, which keeps its own capitalisation. */
export const TAXONOMY_KEYS = [/^labels\.youtube\./];

const MASK = String.fromCharCode(1);
const CAP_WORD = /^[A-Z][a-z'’]+$/;

function mask(value) {
	const found = [];
	let out = value;
	for (const phrase of NAME_PHRASES) {
		let at;
		while ((at = out.indexOf(phrase)) !== -1) {
			out = out.slice(0, at) + MASK + found.length + MASK + out.slice(at + phrase.length);
			found.push(phrase);
		}
	}
	return { out, found };
}

const unmask = (value, found) =>
	value.replace(new RegExp(`${MASK}(\\d+)${MASK}`, 'g'), (m, i) => found[Number(i)]);

/**
 * A label is a short standalone phrase: a button, a label or a heading. Prose
 * is left alone, because a capital inside a sentence is usually a name.
 * @param {string} value
 */
export function isLabelPhrase(value) {
	if (!value) return false;
	if (/[<{]/.test(value)) return false;
	if (/[.!?;]/.test(value.replace(/\.\.\.$/, '').replace(/…$/, ''))) return false;
	const words = value.trim().split(/\s+/);
	return words.length >= 2 && words.length <= 8;
}

function lowerWord(word) {
	return word
		.split('-')
		.map((segment) => {
			const lead = segment.match(/^[("'“‘&/]*/)[0];
			const tail = segment.match(/([)"'”’,:;!?…]|\.\.\.)*$/)[0];
			const bare = segment.slice(lead.length, segment.length - tail.length);
			if (!CAP_WORD.test(bare) || NAME_WORDS.has(bare)) return segment;
			return lead + bare[0].toLowerCase() + bare.slice(1) + tail;
		})
		.join('-');
}

/** @param {string} value */
export function toSentenceCase(value) {
	const { out, found } = mask(value);
	const words = out.trim().split(/\s+/);
	for (let i = 1; i < words.length; i++) words[i] = lowerWord(words[i]);
	// The first word keeps its capital, but a hyphenated compound does not keep
	// capitals after the hyphen: "In-App Browsers" -> "In-app browsers".
	if (words[0] && words[0].includes('-')) {
		const [head, ...tail] = words[0].split('-');
		words[0] = [head, ...tail.map(lowerWord)].join('-');
	}
	return unmask(words.join(' '), found);
}

/**
 * True when an English label is Title Cased and should not be.
 * @param {string} key
 * @param {string} value
 */
export function needsSentenceCase(key, value) {
	if (TAXONOMY_KEYS.some((re) => re.test(key))) return false;
	if (!isLabelPhrase(value)) return false;
	return toSentenceCase(value) !== value;
}
