# MB Smart Style Guide

The house style, in one place, for every surface in the estate: `@mbsmart/ui` and
the four apps that consume it (`customer-portal-svelte`, `device-portal-svelte`,
`mb-oauth-portal`, `portal-svelte`), plus the print and marketing artwork in
`branding/`.

This file is the **canonical** copy. The rules below used to live scattered across
half a dozen `README.md` / `AGENTS.md` / `CLAUDE.md` files, which is how the two
portals drifted apart in the first place. Those files now point here; add a rule
here, not there.

Repo-specific detail that is genuinely local — which island owns which state, how
one app's routes are laid out — stays in that repo's own docs. What belongs here
is anything a *second* surface would have to copy.

---

## Browser tab titles

Every MB Smart app spells its tab the same way:

```
Segment · Brand
```

- The separator is a **middle dot**, `·` (U+00B7), with one space either side.
  Not a hyphen, not an en dash, not an em dash, not a pipe. It is the separator
  GitHub, Figma and most of the web use, and it reads as a divider rather than as
  punctuation inside the sentence — which matters, because segments themselves
  sometimes contain a hyphen.
- **The brand is always last**, so the tab strip stays legible when a browser
  truncates titles to a few characters.
- **No segment → brand alone.** A route that sets no title of its own falls back
  to the bare brand rather than to a dangling separator.
- **The brand token is not translated.** It is the product's name, and a visitor
  moving between portals should see the same word in the tab strip whatever their
  language is. The *segment* is translated like everything else.

One brand token per app:

| App | Brand |
| --- | --- |
| `customer-portal-svelte` | `MB Smart Filtering` |
| `device-portal-svelte` | `MB Smart Filtering` |
| `mb-oauth-portal` | `MB Smart Login` |
| `portal-svelte` | `MB Smart Technician` |

Both filtering surfaces share a token on purpose: they are the same product to
the family that uses them.

**How to set one.** Never write a second `<title>` into `svelte:head`. Browsers
honour only the first `<title>` in the document, and Svelte *appends* head blocks,
so a second one silently fails to update the tab. Each app funnels every title
through one place:

| App | Mechanism |
| --- | --- |
| `customer-portal-svelte` | `<PageTitle />` → `store/pageTitle.ts` (`formatPageTitle`), applied by the root layout via `document.title`; `app.html` owns the static fallback |
| `portal-svelte` | `<PageTitle />` → `lib/utils/state/pageTitle.js` (`formatPageTitle`), same shape |
| `device-portal-svelte` | `pageTitle()` from `lib/pageTitle.ts`, in each page's `svelte:head` (SSR resolves nested titles by depth, so the layout's fallback is replaced rather than duplicated) |
| `mb-oauth-portal` | `pageTitle()` from `lib/pageTitle.ts`, same shape |

Changing the separator means changing the four formatter functions above, and
nothing else — no page hard-codes it.

---

## Colour

### Palette

The theme is declared once, in `src/styles.css` of this package, and reaches
consuming apps through `@import '@mbsmart/ui/styles.css'`. Never redeclare a
colour in an app.

| Family | Role |
| --- | --- |
| `azure` | The brand. Primary actions, links, focus, everything Basic. |
| `mulberry` | Pro. Everything that is a paid tier or an upgrade. |
| `blue-chill` | Secondary accent. |
| `merino` | Warm neutral accent. |
| `green-alt` | Success / allowed. |
| `red-alt` | Danger / blocked. |
| `orange-alt` | Warning / paused. |
| `gray`, `zinc` | Tailwind's own, plus `zinc-750` (`#333338`) added here for the dark-mode step Tailwind omits. |

The `-alt` families exist because Tailwind's stock `green` / `red` / `orange` sit
badly next to `azure`; use the `-alt` one every time.

**Colour carries information, not decoration.** The azure/mulberry split is the
one semantic pair that must never be used for taste: a customer who read the
brochure in the waiting room already knows mulberry means Pro before reading a
word. Keep the split in the *accents* — eyebrows, rules, ticks, numerals, chip
fills, card grounds — not in the page field.

### Shape and colour tokens

| Token | Usage |
| --- | --- |
| `gray-100` | Unselected button background |
| `gray-700` | Special text |
| `gray-900` | Regular text |
| `gray-900/50` | Placeholder text |
| `gray-900/40` | Modal backdrop |
| `azure-600`, `azure-700` | Primary backgrounds |
| `azure-900` | Hover state from `azure-700` |
| `rounded-xl` | Islands |
| `rounded-lg` | Buttons, inputs |
| `shadow-lg` | The default elevation; anything else needs a reason |

### Light ↔ Dark mappings

Every surface supports dark mode. Swap the light-mode colour for its counterpart
below; where several are listed, pick the one that fits the context.

| Light | Dark |
| --- | --- |
| `gray-900` | `gray-50` |
| `gray-700` | `gray-200` |
| `gray-600` | `gray-300` |
| `gray-300` | `gray-600` |
| `gray-100` | `gray-800` or `zinc-750` |
| `gray-50` | `gray-900` |
| `neutral-900` | `zinc-50` |
| `neutral-100` | `zinc-750` |
| `neutral-50` | `zinc-750` |
| `white` | `zinc-800` |
| `azure-900` | `azure-700`, `azure-50`, or `azure-600` |
| `azure-700` | `azure-500`, `azure-200`, or `azure-400` |
| `azure-500` | `azure-300`, `azure-400`, `azure-200`, `azure-200/25`, or `azure-200/50` |
| `azure-200` | `azure-700` or `zinc-700` |
| `azure-100` | `azure-800` or `zinc-750` |
| `azure-50` | `azure-900` or `zinc-800` |
| `orange-alt-50` | `orange-alt-900` |
| `orange-alt-700` | `orange-alt-200` |
| `orange-alt-600` | `orange-alt-300` or `orange-alt-500` |
| `red-alt-600` | `red-alt-300` or `red-alt-500` |
| `green-alt-600` | `green-alt-300` or `green-alt-500` |

---

## Corners — `g2` is the house style

Every corner with a radius of **8px or more** carries `g2`, a `@utility` declared
in `styles.css` that sets `corner-shape: squircle`. It turns the default G1 corner
(a circular arc spliced onto the edge, curvature jumping 0 → 1/r) into a G2
continuous one — the corner Apple uses on its hardware and app icons. It is the
cheapest single change that makes the product read as premium rather than
default-Tailwind, which is why the rule is absolute rather than case-by-case:
consistency is the whole effect.

**When you add or edit markup with a radius, add `g2` alongside it**, subject to
three rules that are not negotiable:

- **`g2` needs a radius on the same element.** `corner-shape` only reshapes
  corners that already have one. Alone it is a silent no-op — which also makes it
  *safe* on partially rounded elements (`rounded-t-lg`, `sm:rounded-e-xl`): square
  corners stay square, and a `sm:`-only radius stays unshaped below `sm`.
- **Never on `rounded-full`.** A 50% radius plus `squircle` is not a circle, it is
  an app-icon blob. Avatars, toggle knobs, radio dots, pills and the Modal drag
  handle are deliberately left plain — check the grep before "fixing" one.
- **Never on `rounded` / `rounded-sm` (≤ 4px).** The arc is too short for the
  difference to register, so it is bytes for nothing. `Badge`, `CheckBox`,
  `JSONPrint` and the `Skeleton` sub-rows are correctly excluded.

Support is progressive enhancement with **no `@supports` wrapper on the shape**.
Browsers without `corner-shape` drop the declaration and render the old G1 radius,
with no layout shift. Do not add a fallback; there is nothing to fall back to.

### `--g2-scale`

A superellipse fills more of the corner than a circular arc of the same radius, so
a squircle at the authored radius reads visibly *tighter* than the G1 corner it
replaced. `g2` compensates by re-pointing `--radius-lg` … `--radius-4xl` on its own
element to `base × var(--g2-scale)`.

- **It is 1 without `corner-shape` support.** Those browsers draw a circular
  corner, which already looks right unscaled. The `@supports` guard belongs on the
  *scale*, never on the shape.
- **It is tunable per app** — `:root { --g2-scale: … }` after the import. The right
  value depends on which radii the app actually uses; a UI built mostly from 8px
  corners needs more compensation than one whose prominent surfaces are 16–44px.
  The two portals legitimately differ, so check the product before changing one.
- **For an arbitrary radius, multiply it in yourself**:
  `rounded-[calc(2.75rem*var(--g2-scale))]`. Only the named scale is rescaled.

Components that apply `g2` internally are listed in
[DOCUMENTATION.md](DOCUMENTATION.md#css-classes-reference).

---

## Typography

`font-sans` is **two typefaces split by script**, and both ship with this package.
Consumers get them from `@import '@mbsmart/ui/styles.css'` and must **never**
re-declare one or copy it into their own `static/fonts`.

| Family | Script / subset | Locales |
| --- | --- | --- |
| Poppins | latin, latin-ext | en / es / fr and all Latin text |
| Google Sans | cyrillic | ru |
| Google Sans | hebrew | he, yi |

Each face carries a `unicode-range`, so the browser picks per character. There is
nothing to wire up for i18n — no `:lang()` rules, no switching on `$language` or
`dir` — and mixed-script text renders correctly on its own.

Google Sans replaced Montserrat (cyrillic) and Heebo (hebrew) in August 2026. It
draws real italics in both scripts, so an `italic` accent span is a designed face
in every locale; under Heebo the Hebrew ones were a synthesised oblique slanting
*against* the reading direction. Anything that worked around that by forcing RTL
emphasis upright can drop the workaround.

**App-local faces are the exception, not the pattern.** `customer-portal-svelte`
adds Amatic SC Bold as `font-handwritten` because it is the one handwritten face
covering every UI language in a single font — latin, latin-ext, cyrillic *and*
hebrew. Swapping it means re-checking Hebrew *and* Cyrillic coverage; most script
fonts (Caveat, Marck Script, …) have no Hebrew and silently fall back to a
non-handwritten face for he/yi.

---

## RTL

Six languages ship, two of them RTL (he, yi). **RTL is a real mirror, not
right-aligned text.**

- Use **logical properties** everywhere: `border-inline-end`, `padding-inline`,
  `margin-inline-start`, `text-start`. Do not reintroduce `left` / `right` /
  `padding-left`. Tailwind's `ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-` utilities are
  the logical ones; `ml-`/`mr-` are not.
- `dir="rtl"` on the root should be the **only** switch a layout needs. If a
  layout needs a second one, the layout is wrong.
- Never build a string by concatenating a brand and a segment in translation
  files. That is what produced titles reading `MB Smart Portal - התחברות`, and it
  is why the brand lives in code (see [Browser tab titles](#browser-tab-titles)).

---

## Accessibility

Consuming apps cannot fix a primitive that is inaccessible, so semantics belong in
the component, in this package:

- **Every interactive primitive carries its role and state.** Toggles are
  `role="switch"` + `aria-checked`; button groups are `role="group"` with
  `aria-pressed` per option; disclosures pair `aria-expanded` with `aria-controls`
  and an `id` on the panel; `Modal` is `role="dialog"` + `aria-modal`.
- **Take the name as a prop, never hard-code English.** The convention is an
  `ariaLabel` prop (plus specific ones such as `closeLabel`, `collapseLabel`,
  `expandLabel`) defaulting to sensible English, so host apps pass a translated
  string. Do not build a name by string-concatenating in the template.
- **When the visible label is a plain element, tie it to the control.**
  `NamedControl` wraps the row in `role="group"` with `aria-labelledby` pointing at
  the label span — that one association names every toggle, selector and input
  dropped into its slot.
- **Generate ids with `$props.id()`**, assigned as the *entire* initializer of its
  own `const` (Svelte rejects it inside a template literal), then interpolate that
  variable. `Math.random()` is not SSR-safe.
- **Pointer-only affordances** (drag handles, decorative overlays) get
  `aria-hidden="true"` so they never reach the a11y tree.

In consuming apps:

- **Icon-only buttons carry `aria-label`.** A `title` is a tooltip, not a name.
  Where the same control repeats down a list, put the row's subject in the label —
  `"App status: WhatsApp"`, not `"App status"`. Decorative icons beside real text
  get `aria-hidden="true"`.
- **Segmented controls** are a `role="group"` with an `aria-label`, each option
  carrying `aria-pressed`.
- **Anything that collapses** gets `aria-expanded` plus `aria-controls`. `Island`
  and `NamedControl` handle this — do not hand-roll a disclosure that skips it.
- **Modals**: pass `ariaLabel` (the modal's own title) and `closeLabel`. The button
  that opens one gets `aria-haspopup="dialog"`.
- **Async results** need a live region: `role="status" aria-live="polite"` with the
  result count, and `aria-busy` on the container while loading. Progress bars are
  `role="progressbar"` with `aria-valuenow` / `aria-valuemin` / `aria-valuemax`.
- **Never silence the linter.** A `svelte-ignore a11y_*` comment means the markup
  is wrong: put the handler on a real `<button>` and make nested interactive
  elements siblings rather than children.
- Accessible names are **translated** like everything else.

---

## Code conventions

- **Components**: PascalCase, descriptive (`ToggleSwitch.svelte`,
  `ImageFilteringPresets.svelte`)
- **Utilities**: camelCase (`stringUtils.js`)
- **Props / variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Atomic design** — atoms → molecules → organisms → templates. A component that
  reaches for app state belongs a layer up, not down.
- **Tailwind v4 utilities for all styling.** Inline styles and custom CSS need a
  reason that a utility cannot express.
- **Svelte 5 runes** (`$state`, `$derived`, `$effect`, `$props`). No Svelte 4
  reactive syntax, no `export let`.
- **Snippets over slots** (`{@render children?.()}`).

---

## Print and marketing copy (`branding/`)

The print artwork is built from static HTML and follows the palette and the
azure/mulberry split above. Two rules apply there and nowhere else, both enforced
by the build scripts:

- **No em dashes**, in copy or in code comments. Use a colon for a label and its
  list, parentheses for an aside, or split the sentence. The one exception is the
  image-filtering level names ("Skin Painting — All People"), which are product
  names carried over from the portal verbatim; keep them in the `.lv` element the
  check allows.
- **The veil is symmetric** — `azure-200` at the top and bottom edges with a white
  plateau across the middle, so a sheet does not read as getting lighter towards
  one end.

Folding, panel order and print-dialog settings live with the artwork, in
`branding/marketing/brochure/README.md` and `branding/marketing/posters/README.md`.
