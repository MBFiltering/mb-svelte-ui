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
import Cookies from 'js-cookie';

const isBrowser = typeof window !== 'undefined';

// Cookie name for language preference
const LANGUAGE_COOKIE = 'mb_language';

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Supported languages with display names
export const SUPPORTED_LANGUAGES = [
	{ code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
	{ code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
	{ code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
	{ code: 'yi', name: 'Yiddish', nativeName: 'ייִדיש', dir: 'rtl' }
];

/**
 * Get the initial language from cookie or default
 */
function getInitialLanguage() {
	if (isBrowser) {
		const saved = Cookies.get(LANGUAGE_COOKIE);
		if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
			return saved;
		}
	}
	return DEFAULT_LANGUAGE;
}

// Create the language store
export const language = writable(getInitialLanguage());

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

	language.set(langCode);

	if (isBrowser) {
		Cookies.set(LANGUAGE_COOKIE, langCode, {
			expires: 365,
			secure: false,
			sameSite: 'lax'
		});

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
 * @param {function} navigateFn - Navigation function (e.g., goto from '$app/navigation')
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
