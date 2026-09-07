/**
 * The estate glossary: what happens to a term when a string is translated.
 *
 * Every finding in the September 2026 localisation audit came from the same
 * cause: four apps were each translated from their own English original, in
 * isolation, so a decision that should have been made once ("is Pro a product
 * name?") was made afresh five times per app. A style guide cannot fix that on
 * its own, because a style guide is prose and prose is not checkable. This file
 * is the checkable half.
 *
 * Three policies cover everything the audit found:
 *
 *   invariant  The term appears verbatim in every locale. Brand tokens, product
 *              and feature names, third-party product names, acronyms.
 *   fixed      One approved word per locale, and that word is authored once.
 *              Everything here is derived from the shared key-first namespaces
 *              below, so the approved word has exactly one home.
 *   free       Translate normally. Everything not listed.
 *
 * `scripts/check-i18n-consistency` in each app enforces this. Adding a term is
 * a one-line edit here, and it applies to all four catalogs at once.
 *
 * @see mb-specs/dev-resources/STYLE-GUIDE.md
 */

import { authTranslations } from './authTranslations.js';
import { safetyTranslations } from './safetyTranslations.js';

/**
 * Terms that must appear verbatim in every locale.
 *
 * `forbid` lists the spellings that have actually shipped and must not come
 * back; the check flags them even in a string whose English does not name the
 * term, which is how a transliteration gets caught.
 *
 * @type {Array<{ term: string, note?: string, forbid?: string[] }>}
 */
export const invariantTerms = [
	// Brand tokens. One per app; the segment beside them is translated.
	{ term: 'MB Smart', forbid: ['MB Inteligente', 'MB Умный'] },
	{
		term: 'MB Smart Filtering',
		note: 'tab-title brand token for customer-portal-svelte and device-portal-svelte',
		forbid: ['MB Smart Filtrado', 'MB Smart Filtrage', 'סינון MB Smart', 'Фильтрация MB Smart', 'MB Smart פילטערינג']
	},
	{ term: 'MB Smart Account', note: 'tab-title brand token for mb-oauth-portal' },
	{ term: 'MB Smart Technician', note: 'tab-title brand token for portal-svelte' },
	{ term: 'MB Smart Protect', note: 'the on-device app' },

	// Plan tiers. Product names, not adjectives: the customer reads the same
	// word on the brochure, the pricing page and the device chip.
	{
		term: 'Pro',
		forbid: ['PRO', 'Про', 'פרו', 'פּראָ', 'Basique']
	},
	{
		term: 'Basic',
		forbid: ['BASIC', 'Básico', 'Basique', 'Базовый', 'БАЗОВЫЙ', 'בסיסי', 'באַזיש', 'גרונט פּלאַן']
	},

	// Product features. Named things, in the product's own words.
	{ term: 'App Shield', forbid: ['Escudo de Apps', 'Bouclier Apps', 'Щит приложений', 'מגן אפליקציות', 'אַפּ־שילד'] },
	{ term: 'MB Browser', forbid: ['MB בלעטערער'] },
	{ term: 'Pro Browser' },
	{ term: 'MB Portal', forbid: ['MB פּאָרטאַל'] },
	{ term: 'MB Filter' },
	{ term: 'YouTube Pro' },
	{ term: 'Master Switch' },

	// Third-party product names. Hebrew used to transliterate about a third of
	// these, inconsistently, inside a single file.
	{ term: 'YouTube', forbid: ['יוטיוב', 'יוטוב', 'Youtube'] },
	{ term: 'Apple', forbid: ['אפל', 'אַפּל'] },
	{ term: 'iPhone', forbid: ['אייפון', 'Iphone'] },
	{ term: 'iPad', forbid: ['אייפד', 'Ipad'] },
	{ term: 'iCloud', forbid: ['אייקלאוד', 'Icloud'] },
	{ term: 'Safari', forbid: ['ספארי', 'סאַפֿאַרי'] },
	{ term: 'Chrome', forbid: ['כרום', 'כראָום'] },
	{ term: 'Chromium' },
	{ term: 'Android', forbid: ['אנדרואיד', 'אַנדרויד', 'אַנדראָיד'] },
	{ term: 'Google', forbid: ['גוגל', 'גוגעל'] },
	{ term: 'Gmail' },
	{ term: 'WhatsApp', forbid: ['וואטסאפ', 'וואַצאַפּ', 'Whatsapp'] },
	{ term: 'Telegram' },
	{ term: 'Windows' },
	{ term: 'macOS', forbid: ['Macos'] },
	{ term: 'iOS', forbid: ['Ios'] },
	{ term: 'Mac' },
	{ term: 'App Store' },
	{ term: 'Play Store' },
	{ term: 'Siri' },
	{ term: 'WebKit', forbid: ['Webkit'] },

	// Acronyms. Already consistent in every locale; listed so they stay that way.
	{ term: 'DNS' },
	{ term: 'VPN' },
	{ term: 'MDM' },
	{ term: 'PIN' },
	{ term: 'IAB' },
	{ term: 'TAG' },
	{ term: 'API' }
];

/** Just the strings, for a quick membership test. */
export const invariant = invariantTerms.map((t) => t.term);

/**
 * Turn a key-first namespace into `{ englishValue: { locale: approvedWord } }`.
 *
 * Deriving `fixed` from the shared namespaces rather than restating it here is
 * the point: the approved word for "Trusted" lives in exactly one file, and a
 * glossary that repeated it would be one more copy to drift.
 *
 * @param {Record<string, Record<string, Record<string, string>>>[]} bundles
 * @returns {Record<string, { key: string, byLocale: Record<string, string> }>}
 */
function fixedFrom(bundles) {
	/** @type {Record<string, { key: string, byLocale: Record<string, string> }>} */
	const out = {};
	for (const bundle of bundles) {
		for (const [namespace, keys] of Object.entries(bundle)) {
			for (const [key, byLocale] of Object.entries(keys)) {
				if (!byLocale.en) continue;
				out[byLocale.en] = { key: `${namespace}.${key}`, byLocale };
			}
		}
	}
	return out;
}

/**
 * Terms with one approved word per locale, keyed by the English.
 *
 * Every entry names the shared key that owns it, so a checker can tell an app
 * "this string already exists as `safety.trusted`, read it from there" rather
 * than only "your translation disagrees".
 */
export const fixed = fixedFrom([safetyTranslations, authTranslations]);

/**
 * Look a term up. Returns `'invariant'`, `'fixed'` or `'free'`.
 * @param {string} englishValue
 */
export function policyFor(englishValue) {
	if (fixed[englishValue]) return 'fixed';
	if (invariant.includes(englishValue)) return 'invariant';
	return 'free';
}
