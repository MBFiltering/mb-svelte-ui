/**
 * Estate-wide preference cookies.
 *
 * The portals are separate origins — `customer.`, `portal.`, `identity.` and `www.`
 * under `mb-smart.net` — so a preference that has to hold across all of them cannot
 * live in `localStorage`, which is scoped to one origin and unreadable from any other.
 * A cookie carrying a `Domain` of the parent zone is sent to every host under it, and
 * that is the entire mechanism behind "switch the theme in one portal, switch it in
 * all of them". Everything else in this file follows from that one fact.
 *
 * Only two preferences are estate-wide: the colour scheme (`utils/theme.js`) and the
 * language (`utils/i18n/languageStore.js`). A setting only one portal has — the
 * technician portal's `mb_setting_*` cookies — stays host-only and does not belong here.
 */

import Cookies from 'js-cookie';

const isBrowser = typeof window !== 'undefined';

/** The zone every production portal is a subdomain of. */
export const PREFERENCE_ZONE = 'mb-smart.net';

/** How long a preference is remembered, in days. */
const PREFERENCE_EXPIRY_DAYS = 365;

/**
 * The `Domain` a preference cookie is written with, or `undefined` for a host-only
 * cookie when this host is not in the production zone.
 *
 * Host-only is the correct answer, not a failure, in the three places we actually run
 * outside production: `localhost` (a `Domain` for it is invalid and the browser drops
 * the cookie), Cloudflare Pages previews on `*.pages.dev` (a public suffix — the
 * browser refuses a cookie spanning it), and `prod-test-customer.mbsmart.net`, which
 * is the **un**hyphenated zone and therefore a different registrable domain. None of
 * those can share preferences with anything; each degrades to remembering its own.
 *
 * @param {string} [hostname] - Defaults to the current host.
 * @returns {string|undefined}
 */
export function preferenceCookieDomain(hostname = isBrowser ? window.location.hostname : '') {
	return hostname === PREFERENCE_ZONE || hostname.endsWith(`.${PREFERENCE_ZONE}`)
		? `.${PREFERENCE_ZONE}`
		: undefined;
}

/**
 * Read an estate-wide preference.
 *
 * @param {string} name - Cookie name.
 * @returns {string|undefined}
 */
export function readPreference(name) {
	return isBrowser ? Cookies.get(name) : undefined;
}

/**
 * Write an estate-wide preference, zone-wide where the zone allows it.
 *
 * @param {string} name - Cookie name.
 * @param {string} value - Value to persist.
 */
export function writePreference(name, value) {
	if (!isBrowser) return;

	const domain = preferenceCookieDomain();

	// A cookie's identity is (name, domain, path), so writing the zone-wide one does
	// *not* replace a host-only cookie of the same name — the browser keeps both and,
	// with equal paths, hands back whichever was created first. That is the older,
	// host-only one, which would pin this portal to a stale value permanently while
	// every other portal moved on. Clearing the twin first is what stops that.
	if (domain) Cookies.remove(name);

	Cookies.set(name, value, {
		expires: PREFERENCE_EXPIRY_DAYS,
		sameSite: 'lax',
		secure: window.location.protocol === 'https:',
		domain
	});
}

/**
 * Drop the per-portal preferences the zone-wide cookies replaced (August 2026).
 *
 * The values are deliberately not migrated — a portal-local preference says nothing
 * about what the person wants estate-wide, and the two portals that had one disagreed
 * on the vocabulary anyway ('light'/'dark' against 'on'/'off'). Everyone starts at
 * `system` once. This only clears the abandoned keys so a year of dead cookies does
 * not sit in the jar confusing the next person to open devtools.
 */
export function clearLegacyPreferences() {
	if (!isBrowser) return;

	Cookies.remove('mb_language'); // superseded by mb_lang
	Cookies.remove('mb_setting_dark_mode'); // superseded by mb_theme

	try {
		window.localStorage.removeItem('theme'); // customer + oauth portals' old store
	} catch {
		// Storage can throw in a locked-down browser; there is nothing to fall back to.
	}
}
