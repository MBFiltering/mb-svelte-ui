/**
 * Internationalization (i18n) Engine
 *
 * Provides translation functions for multi-language support.
 *
 * Two data shapes are supported, and both resolve through the same `t`/`tr`:
 *
 *   key-first    { namespace: { key: { en: '…', he: '…' } } }
 *                registered eagerly via registerTranslations(). One module
 *                carries every language, so every visitor downloads all of
 *                them — fine for a handful of shared strings, expensive for an
 *                app's full dictionary.
 *
 *   locale-first { namespace: { key: '…' } }, one module per language
 *                registered via registerLocale() / registerLocaleLoaders() +
 *                loadLanguage() (see localeRegistry.js). Only the visitor's own
 *                language is fetched.
 *
 * Locale-first data wins when both define a key, so an app can migrate one
 * namespace at a time.
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
import { language, getCurrentLanguage, DEFAULT_LANGUAGE } from './languageStore.js';
import {
	i18nVersion,
	bumpI18nVersion,
	getLocaleData,
	getLoadedLanguages,
} from './localeRegistry.js';

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
	bumpI18nVersion();
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
 * Look a key up in the locale-first registry for one language.
 * @returns {string|undefined}
 */
function fromLocale(key, lang) {
	const data = getLocaleData(lang);
	if (!data) return undefined;
	const value = getNestedValue(data, key);
	return typeof value === 'string' ? value : undefined;
}

/**
 * Get translation for a key and language.
 *
 * Resolution order, first hit wins:
 *   1. the requested language, locale-first
 *   2. the requested language, key-first
 *   3. English, either shape
 *   4. any other locale already in memory
 *
 * Step 4 is what makes a language switch bearable: `setLanguage()` flips the
 * store immediately but its chunk arrives a tick later, so for that tick the
 * page keeps rendering the language it was already showing rather than a wall
 * of raw dotted keys. The `i18nVersion` bump then re-renders it properly.
 *
 * @param {string} key - Translation key in dot notation
 * @param {string} lang - Language code
 * @param {object} props - Optional interpolation props
 * @returns {string} Translated string
 */
export function getTranslation(key, lang, props = {}) {
	const direct = fromLocale(key, lang);
	if (direct !== undefined) return interpolate(direct, props);

	const langObj = getNestedValue(translations, key);
	const keyFirst = langObj?.[lang];
	if (keyFirst !== undefined) return interpolate(keyFirst, props);

	const fallback =
		fromLocale(key, DEFAULT_LANGUAGE) ??
		langObj?.[DEFAULT_LANGUAGE] ??
		getLoadedLanguages()
			.map((loaded) => fromLocale(key, loaded))
			.find((value) => value !== undefined);

	if (fallback === undefined) {
		if (langObj === undefined) {
			console.warn(`Translation key not found: ${key}`);
		} else {
			console.warn(`Translation not found for key: ${key}, language: ${lang}`);
		}
		return key;
	}

	return interpolate(fallback, props);
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
 * `i18nVersion` is a dependency as well as `language`: locale chunks arrive
 * asynchronously, and a store derived from the language alone would never
 * re-run for a chunk that lands after the switch.
 *
 * @type {import('svelte/store').Readable<(key: string, props?: object) => string>}
 */
export const t = derived([language, i18nVersion], ([$language]) => {
	return (key, props = {}) => {
		return getTranslation(key, $language, props);
	};
});

/**
 * Get all translation keys for a namespace, in the current language's
 * locale-first data if present, otherwise from key-first data.
 * @param {string} namespace - Namespace (e.g., 'dashboard', 'common')
 * @returns {object} All keys in the namespace
 */
export function getNamespaceKeys(namespace) {
	return getLocaleData(getCurrentLanguage())?.[namespace] ?? translations[namespace] ?? {};
}

/**
 * Check if a translation key exists in any registered shape or language.
 * @param {string} key - Translation key
 * @returns {boolean}
 */
export function hasTranslation(key) {
	if (getNestedValue(translations, key) !== undefined) return true;
	return getLoadedLanguages().some((lang) => fromLocale(key, lang) !== undefined);
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
	bumpI18nVersion();
}

/**
 * Get all available languages from registered translations.
 *
 * Note this reports what is *in memory*: with locale-first data only the
 * loaded chunks count, so use SUPPORTED_LANGUAGES (or getRegisteredLocales())
 * to enumerate what the app offers.
 *
 * @returns {string[]} Array of language codes
 */
export function getAvailableLanguages() {
	const langs = new Set(getLoadedLanguages());
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
