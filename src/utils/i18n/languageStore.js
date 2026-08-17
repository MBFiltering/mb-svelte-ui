/**
 * Language Store
 *
 * Manages the current language setting for i18n support.
 * Persists to cookies for consistency across sessions.
 * Supports URL-based language routing (/en/..., /he/...).
 *
 * Supported languages:
 * - 'en' - English (default)
 * - 'es' - Spanish
 * - 'fr' - French
 * - 'he' - Hebrew (RTL)
 * - 'ru' - Russian
 * - 'yi' - Yiddish (RTL)
 */

import { writable, get } from 'svelte/store';
import { readPreference, writePreference } from '../preferences.js';
import { loadLanguage } from './localeRegistry.js';

const isBrowser = typeof window !== 'undefined';

/**
 * Cookie name for the language preference.
 *
 * Estate-wide, written zone-wide by `writePreference` so picking a language in one
 * portal picks it in all of them — see `utils/preferences.js`. It is mirrored in
 * every app's pre-paint snippet (`<html lang>` and `dir` have to be right before the
 * first paint or RTL flashes), so renaming it is a change in four repos.
 */
export const LANGUAGE_COOKIE = 'mb_lang';

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Supported languages with display names
export const SUPPORTED_LANGUAGES = [
	{ code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
	{ code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
	{ code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
	{ code: 'yi', name: 'Yiddish', nativeName: 'ייִדיש', dir: 'rtl' },
];

/**
 * Codes that were renamed after some stacks had already shipped the old one.
 *
 * Hebrew was `iw` until ISO 639 renamed it `he` in 1989, and Yiddish was `ji`; Java's
 * `Locale` still normalises to the old spellings, and legacy Android WebViews inherit
 * them. Modern browsers say `he-IL`, so this is a long tail rather than a common case —
 * but it is a long tail made of exactly the two languages this product exists for, and
 * an unrecognised tag falls through to English silently.
 */
const LEGACY_LANGUAGE_ALIASES = { iw: 'he', ji: 'yi' };

/**
 * Reduce a BCP-47 tag to a supported language code, or null.
 *
 * `he-IL` → `he`, `IW` → `he`, `ru-RU` → `ru`, `de` → null. The region is dropped: we
 * ship one translation per language and no regional variants.
 *
 * @param {string|null|undefined} tag
 * @returns {string|null}
 */
export function normalizeLanguageTag(tag) {
	if (!tag) return null;
	const base = String(tag).toLowerCase().trim().split('-')[0];
	const code = LEGACY_LANGUAGE_ALIASES[base] ?? base;
	return isValidLanguage(code) ? code : null;
}

/**
 * The first supported language in a list of tags, best first, or null.
 *
 * @param {readonly (string|null|undefined)[]} tags
 * @returns {string|null}
 */
export function pickSupportedLanguage(tags) {
	for (const tag of tags ?? []) {
		const code = normalizeLanguageTag(tag);
		if (code) return code;
	}
	return null;
}

/**
 * The best supported language an `Accept-Language` header asks for, or null.
 *
 * Sorted by `q` rather than trusting header order: browsers do emit descending q, but
 * the ordering is the weights' to state and a proxy may rewrite the header. An entry
 * with no `q` is 1, and `q=0` means "explicitly not this" and is dropped.
 *
 * @param {string|null|undefined} header
 * @returns {string|null}
 */
export function languageFromAcceptLanguage(header) {
	const entries = (header ?? '')
		.split(',')
		.map((entry) => {
			const [tag, ...params] = entry.split(';').map((part) => part.trim());
			const q = params
				.map((param) => /^q=([\d.]+)$/i.exec(param))
				.find(Boolean)?.[1];
			return { tag, q: q === undefined ? 1 : Number.parseFloat(q) };
		})
		.filter(({ tag, q }) => tag && Number.isFinite(q) && q > 0)
		.sort((a, b) => b.q - a.q);

	return pickSupportedLanguage(entries.map(({ tag }) => tag));
}

/**
 * The language to open in, for a browser with no `/{lang}` prefix to go on.
 *
 * The stored preference first — someone who has chosen a language has said the most —
 * then what the device itself asks for, then English. That middle step is why an
 * Israeli phone set to Hebrew opens in Hebrew without anyone touching a picker; it is
 * the device's *declared preference*, not a guess from where the request came from.
 *
 * @returns {string}
 */
export function resolveInitialLanguage() {
	if (!isBrowser) return DEFAULT_LANGUAGE;

	const saved = readPreference(LANGUAGE_COOKIE);
	if (saved && isValidLanguage(saved)) return saved;

	return pickSupportedLanguage(navigator.languages ?? [navigator.language]) ?? DEFAULT_LANGUAGE;
}

// Create the language store
export const language = writable(resolveInitialLanguage());

/**
 * Check if a language code is valid/supported
 * @param {string} langCode - Language code to check
 * @returns {boolean}
 */
export function isValidLanguage(langCode) {
	return SUPPORTED_LANGUAGES.some((l) => l.code === langCode);
}

/**
 * Set the current language and persist to cookie.
 * Does NOT navigate - use setLanguageAndNavigate for URL-based routing.
 * @param {string} langCode - Language code ('en', 'he', etc.)
 */
export function setLanguage(langCode) {
	if (!isValidLanguage(langCode)) {
		console.warn(`Unsupported language: ${langCode}`);
		return;
	}

	// Kick off the locale chunk without waiting for it, so callers that switch
	// language outside a SvelteKit `load` (a picker on an unprefixed SPA route,
	// say) still get their translations. Until it lands `getTranslation` falls
	// back to a loaded locale; the registry bump re-renders on arrival. Apps
	// that route by language should still `await loadLanguage()` in the layout
	// load, which renders the right text on the first frame.
	loadLanguage(langCode);

	language.set(langCode);

	if (isBrowser) {
		writePreference(LANGUAGE_COOKIE, langCode);

		const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
		if (langInfo) {
			document.documentElement.dir = langInfo.dir;
			document.documentElement.lang = langCode;
		}
	}
}

/**
 * Set language from URL parameter (called from layout load)
 * @param {string} langCode - Language code from URL
 */
export function setLanguageFromUrl(langCode) {
	if (isValidLanguage(langCode)) {
		setLanguage(langCode);
	}
}

/**
 * Set the language and navigate to the new URL with the language prefix.
 * Requires a navigation function (e.g., SvelteKit's goto) to be passed in.
 *
 * @param {string} newLang - New language code
 * @param {string} currentPath - Current URL path (e.g., '/en/dashboard')
 * @param {function} navigateFn - Navigation function (e.g., SvelteKit's `goto`, which the
 *   consuming app imports — this package deliberately has no SvelteKit imports of its own,
 *   and spelling one here would trip `svelte-package`'s text scan for them)
 */
export function setLanguageAndNavigate(newLang, currentPath, navigateFn) {
	if (!isValidLanguage(newLang)) {
		console.warn(`Unsupported language: ${newLang}`);
		return;
	}

	setLanguage(newLang);

	if (isBrowser && navigateFn) {
		const langCodes = SUPPORTED_LANGUAGES.map((l) => l.code);
		const langPattern = new RegExp(`^/(${langCodes.join('|')})/`);

		let newPath;
		if (langPattern.test(currentPath)) {
			newPath = currentPath.replace(langPattern, `/${newLang}/`);
		} else {
			newPath = `/${newLang}${currentPath}`;
		}

		navigateFn(newPath, { replaceState: true });
	}
}

/**
 * Get the localized path for a given path
 * @param {string} path - Path without language prefix (e.g., '/dashboard')
 * @param {string} [lang] - Optional language override (defaults to current language)
 * @returns {string} Localized path (e.g., '/en/dashboard')
 */
export function localizedPath(path, lang = null) {
	const currentLang = lang || get(language);
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	return `/${currentLang}${cleanPath}`;
}

/**
 * Get current language code synchronously
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
	return get(language);
}

/**
 * Get language info by code
 * @param {string} langCode - Language code
 * @returns {object|undefined} Language info object
 */
export function getLanguageInfo(langCode) {
	return SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
}

/**
 * Check if current language is RTL
 * @returns {boolean}
 */
export function isRTL() {
	const langInfo = getLanguageInfo(getCurrentLanguage());
	return langInfo?.dir === 'rtl';
}

/**
 * Check if a specific language code is RTL
 * @param {string} langCode - Language code
 * @returns {boolean}
 */
export function isLanguageRTL(langCode) {
	const langInfo = getLanguageInfo(langCode);
	return langInfo?.dir === 'rtl';
}
