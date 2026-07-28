/**
 * Locale Registry — per-locale translation chunks
 *
 * The original engine took one key-first dictionary holding every language
 * inline (`{ ns: { key: { en, es, fr, he, ru, yi } } }`). That shape is pleasant
 * to author but it is a single module, so every visitor downloaded all six
 * languages to read one.
 *
 * This registry holds the locale-first shape instead — `{ ns: { key: 'value' } }`
 * per language — behind a loader map, so an app can ship one module per locale
 * and fetch only the active one. Both shapes coexist: `i18n.js` looks here
 * first and falls back to whatever `registerTranslations()` was given, so
 * consumers that have not split their translations keep working unchanged.
 *
 * Usage (in the consuming app):
 *
 *   import { registerLocaleLoaders, loadLanguage } from '@mbsmart/ui/i18n';
 *
 *   // Vite turns each match into its own chunk; nothing is fetched until called
 *   const modules = import.meta.glob('./translations/*.js');
 *   registerLocaleLoaders(
 *     Object.fromEntries(
 *       Object.entries(modules).map(([path, load]) => [path.match(/([a-z]+)\.js$/)[1], load])
 *     )
 *   );
 *
 *   // then, in the layout `load` that knows the language:
 *   await loadLanguage(params.lang);
 */

import { writable } from 'svelte/store';

/**
 * Locale-first translation data, keyed by language code.
 * Structure: { lang: { namespace: { key: 'value' } } }
 * @type {Record<string, object>}
 */
const localeData = {};

/**
 * Lazy module loaders, keyed by language code.
 * @type {Record<string, () => Promise<any>>}
 */
const localeLoaders = {};

/**
 * In-flight / settled load promises, so concurrent callers share one fetch.
 * @type {Record<string, Promise<void>>}
 */
const pending = {};

/**
 * Bumped whenever translation data changes. `i18n.js` derives the `t` store
 * from this as well as from `language`, so a chunk that lands *after* a
 * component has rendered still re-renders it — without this, a language switch
 * that outruns its fetch would leave the old text on screen permanently.
 * @type {import('svelte/store').Writable<number>}
 */
export const i18nVersion = writable(0);

/** Signal that the registered translation data changed. */
export function bumpI18nVersion() {
	i18nVersion.update((n) => n + 1);
}

/**
 * Deep merge source into target (mutates target).
 * Kept local so this module has no dependency on i18n.js.
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
 * Register translation data for one language, in locale-first format.
 * Safe to call repeatedly; later calls merge into earlier ones.
 *
 * @param {string} lang - Language code ('en', 'he', …)
 * @param {object} data - { namespace: { key: 'value' } }
 */
export function registerLocale(lang, data) {
	if (!data) return;
	if (!localeData[lang]) localeData[lang] = {};
	deepMerge(localeData[lang], data);
	bumpI18nVersion();
}

/**
 * Register lazy loaders for locale chunks.
 *
 * @param {Record<string, () => Promise<any>>} loaders - language code -> dynamic import
 */
export function registerLocaleLoaders(loaders) {
	Object.assign(localeLoaders, loaders);
}

/**
 * Load one locale's chunk and register it. Memoised — calling this on every
 * navigation costs nothing after the first.
 *
 * A module may export its data as `translations` or as the default export.
 *
 * @param {string} lang - Language code
 * @returns {Promise<void>} Resolves once the locale is usable
 */
export function loadLanguage(lang) {
	if (localeData[lang]) return Promise.resolve();
	if (pending[lang]) return pending[lang];

	const loader = localeLoaders[lang];
	if (!loader) return Promise.resolve();

	pending[lang] = loader()
		.then((mod) => {
			registerLocale(lang, mod.translations ?? mod.default);
		})
		.catch((err) => {
			// A missing chunk must not take the page down: `getTranslation`
			// falls back to another loaded locale, and the next navigation
			// retries because the failed promise is cleared here.
			delete pending[lang];
			console.error(`Failed to load translations for language: ${lang}`, err);
		});

	return pending[lang];
}

/**
 * Whether a locale's translations are in memory.
 * @param {string} lang - Language code
 * @returns {boolean}
 */
export function isLanguageLoaded(lang) {
	return Boolean(localeData[lang]);
}

/**
 * Language codes that have been loaded, in load order.
 * @returns {string[]}
 */
export function getLoadedLanguages() {
	return Object.keys(localeData);
}

/**
 * Raw translation data for a language, or undefined if it is not loaded.
 * @param {string} lang - Language code
 * @returns {object|undefined}
 */
export function getLocaleData(lang) {
	return localeData[lang];
}

/**
 * Language codes an app has registered a loader for, whether or not the chunk
 * has been fetched yet.
 * @returns {string[]}
 */
export function getRegisteredLocales() {
	return Object.keys(localeLoaders);
}
