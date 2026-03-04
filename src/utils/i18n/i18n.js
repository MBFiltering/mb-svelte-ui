/**
 * Internationalization (i18n) Engine
 *
 * Provides translation functions for multi-language support.
 * Uses a key-first structure where each translation key contains all language variants.
 *
 * Projects register their own translations via registerTranslations().
 *
 * Usage:
 *   import { t, tr, registerTranslations } from '@mbsmart/ui/i18n';
 *
 *   // Register translations (call once at app startup)
 *   registerTranslations(myTranslations);
 *
 *   // Reactive (use in templates)
 *   {$t('dashboard.welcome')}
 *   {$t('dashboard.welcomeWithName', { name: 'John' })}
 *
 *   // Non-reactive (use in scripts)
 *   const message = tr('dashboard.welcome');
 */

import { derived } from 'svelte/store';
import { language, getCurrentLanguage } from './languageStore.js';

// Translation dictionary - populated by registerTranslations()
// Structure: { namespace: { key: { lang1: value, lang2: value } } }
let translations = {};

/**
 * Deep merge source into target (mutates target)
 */
function deepMerge(target, source) {
	for (const key of Object.keys(source)) {
		if (
			source[key] &&
			typeof source[key] === 'object' &&
			!Array.isArray(source[key]) &&
			target[key] &&
			typeof target[key] === 'object' &&
			!Array.isArray(target[key])
		) {
			deepMerge(target[key], source[key]);
		} else {
			target[key] = source[key];
		}
	}
	return target;
}

/**
 * Register translations (key-first format)
 * Can be called multiple times to add/merge translations.
 *
 * @param {object} data - Translation data in key-first format:
 *   { namespace: { key: { en: '...', he: '...' } } }
 */
export function registerTranslations(data) {
	deepMerge(translations, data);
}

/**
 * Get a nested value from an object using dot notation
 * @param {object} obj - The object to traverse
 * @param {string} path - Dot-notation path (e.g., 'dashboard.welcome')
 * @returns {object|undefined} The value at the path (language object)
 */
function getNestedValue(obj, path) {
	return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Interpolate props into a string
 * Replaces {propName} with the value from props
 * @param {string} str - String with placeholders
 * @param {object} props - Object with prop values
 * @returns {string} Interpolated string
 */
function interpolate(str, props = {}) {
	if (!props || Object.keys(props).length === 0) {
		return str;
	}
	return str.replace(/\{(\w+)\}/g, (match, key) => {
		return props.hasOwnProperty(key) ? props[key] : match;
	});
}

/**
 * Get translation for a key and language
 * @param {string} key - Translation key in dot notation
 * @param {string} lang - Language code
 * @param {object} props - Optional interpolation props
 * @returns {string} Translated string
 */
export function getTranslation(key, lang, props = {}) {
	const langObj = getNestedValue(translations, key);

	if (langObj === undefined) {
		console.warn(`Translation key not found: ${key}`);
		return key;
	}

	const value = langObj[lang] || langObj['en'];

	if (value === undefined) {
		console.warn(`Translation not found for key: ${key}, language: ${lang}`);
		return key;
	}

	return interpolate(value, props);
}

/**
 * Translate a key (non-reactive version)
 * Uses the current language from the language store.
 *
 * @param {string} key - Translation key in dot notation (e.g., 'dashboard.welcome')
 * @param {object} props - Optional props for interpolation
 * @returns {string} Translated string or the key if not found
 */
export function tr(key, props = {}) {
	const lang = getCurrentLanguage();
	return getTranslation(key, lang, props);
}

/**
 * Reactive translation store
 * Use this in templates for automatic updates when language changes.
 *
 * Usage in template:
 *   {$t('dashboard.welcome')}
 *   {$t('dashboard.welcomeWithName', { name: userName })}
 *
 * @type {import('svelte/store').Readable<(key: string, props?: object) => string>}
 */
export const t = derived(language, ($language) => {
	return (key, props = {}) => {
		return getTranslation(key, $language, props);
	};
});

/**
 * Get all translation keys for a namespace
 * @param {string} namespace - Namespace (e.g., 'dashboard', 'common')
 * @returns {object} All keys in the namespace
 */
export function getNamespaceKeys(namespace) {
	return translations[namespace] || {};
}

/**
 * Check if a translation key exists
 * @param {string} key - Translation key
 * @returns {boolean}
 */
export function hasTranslation(key) {
	return getNestedValue(translations, key) !== undefined;
}

/**
 * Add a single translation dynamically
 * @param {string} namespace - Namespace to add to
 * @param {string} key - Key within the namespace
 * @param {object} langValues - Object with language codes and values { en: '...', he: '...' }
 */
export function addTranslation(namespace, key, langValues) {
	if (!translations[namespace]) {
		translations[namespace] = {};
	}
	translations[namespace][key] = langValues;
}

/**
 * Get all available languages from registered translations
 * @returns {string[]} Array of language codes
 */
export function getAvailableLanguages() {
	const langs = new Set();
	const collectLangs = (obj) => {
		for (const value of Object.values(obj)) {
			if (typeof value === 'object' && value !== null) {
				if ('en' in value) {
					Object.keys(value).forEach((lang) => langs.add(lang));
				} else {
					collectLangs(value);
				}
			}
		}
	};
	collectLangs(translations);
	return Array.from(langs);
}
