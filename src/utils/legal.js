/**
 * The house style for the legal documents, in one place.
 *
 * The documents themselves are the Terms body in
 * `components/organisms/TermsContent.svelte` and the Privacy Policy, which
 * still lives in `customer-portal-svelte` — plus whatever chrome each surface
 * wraps them in. They have to read as one set. Keeping the classes here rather
 * than in each file is what stopped the Privacy Policy from drifting to its own
 * body colour and the Terms from carrying an off-palette hex for its headings.
 *
 * These are Tailwind class strings, so they must stay **literal** — the
 * consuming app's Tailwind build scans this package's `dist` (via
 * `@source '../../node_modules/@mbsmart/ui/dist'`) and emits only the utilities
 * it can see spelled out. Build one of these by concatenation and the class
 * survives the move but the CSS behind it does not.
 *
 * The density is deliberately tighter than an app's: a legal document is
 * scanned and scrolled, not read a paragraph at a time, so the type is a step
 * down and the rhythm closes up. That density was designed for the acceptance
 * gate's scroll box and then adopted everywhere, which is why there is no
 * "compact" variant — this *is* the size.
 */
export const legalProse = {
	heading: 'mt-7 mb-3 scroll-mt-4 text-base font-bold text-gray-900 first:mt-0 dark:text-gray-50',
	body: 'text-sm leading-relaxed text-gray-700 dark:text-gray-300',
	paragraph: 'mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300',
	emphasis: 'font-semibold text-gray-900 dark:text-gray-50',
	link: 'text-azure-700 underline dark:text-azure-300',
	// The two ordered levels carry their markers explicitly. Tailwind's preflight
	// resets `list-style` to none, which silently swallowed the `type="a"` /
	// `type="i"` already on every `<ol>` in the Terms — leaving a document that
	// cross-references "section A" with no visible lettering to find it by.
	listOuter: 'mb-3 list-[lower-alpha] space-y-2 pl-5',
	listInner: 'mt-2 list-[lower-roman] space-y-1.5 pl-5',
	listOuterDisc: 'mb-3 list-disc space-y-1.5 pl-5',
	listInnerDisc: 'mt-2 list-disc space-y-1.5 pl-5',
	/** The document's own title, and the revision line under it. */
	title: 'mb-2 text-2xl font-bold text-gray-900 sm:text-4xl dark:text-gray-50',
	revised: 'text-xs text-gray-700 sm:text-sm dark:text-gray-200'
};

/**
 * Facts about the documents that more than one surface has to agree on.
 *
 * The revision date is printed by both the public terms page and the
 * acceptance gate. It is not translated: it stamps an English-only document
 * (see the note on `TermsContent`), so it reads the same everywhere.
 */
export const TERMS_LAST_UPDATED = 'July 2026';
