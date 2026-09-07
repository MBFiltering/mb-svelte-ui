/**
 * Internationalization utilities - translations, labels, language management
 */
import '../../version.js';

export * from './i18n.js';
export * from './languageStore.js';
export * from './localeRegistry.js';
export * from './safetyTranslations.js';
export * from './authTranslations.js';
export * from './glossary.js';
export * from './sentenceCase.js';
// `consistency.js` and `consistencyLoader.js` are build-time only and are not
// re-exported here: the loader reads the filesystem, and neither belongs in a
// browser bundle. Reach them at `@mbsmart/ui/i18n/consistency`.
