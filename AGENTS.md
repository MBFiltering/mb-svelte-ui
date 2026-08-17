# AGENTS.md

> **Living Document**: Any AI agent making changes to this repository, or receives new maxims from the human, **must** update this file accordingly.

> **Design rules live in [STYLE-GUIDE.md](../mb-specs/resources/STYLE-GUIDE.md), in the `mb-specs`
> repo** — the palette, light↔dark mappings, corners, fonts, RTL, accessibility and
> browser tab titles, for this package *and* every app that consumes it. It is the
> canonical copy and it is estate-wide, which is why it does not live here; every repo's
> docs point at it. Add a style rule there, not here.

---

## AI Behaviour & Coding Standards

When working on this codebase, adhere to these principles:

### Core Maxims

1. **DRY (Don't Repeat Yourself)** — Extract shared logic into utilities or composable patterns. Avoid duplicating code across components.

2. **Brevity** — Write concise code. Avoid verbosity. If a simpler solution exists, use it.

3. **Readability to Humans** — Code should be immediately understandable to a human reader.

4. **Separation of concerns** — Components handle UI. Utilities handle logic. Keep them distinct.

5. **Single responsibility** — Each component or function should do one thing well.

6. **Consistency** — Follow existing patterns in the codebase. Match naming conventions, file structure, and coding style.

7. **No branches of your own** — Work on the branch that is already checked out. Never create a branch for a new feature and never switch branches unless the user explicitly asks.

### Svelte-Specific Guidelines

- **Svelte 5 Runes** — This library uses Svelte 5 with runes (`$state`, `$derived`, `$effect`, `$props`, etc.). Do not use legacy Svelte 4 reactive syntax.
- **TailwindCSS v4** — Use Tailwind utility classes for styling. Avoid inline styles or custom CSS unless absolutely necessary.
- **Props via `$props()`** — Destructure props using the runes pattern.
- **Snippets for children** — Use Svelte 5 snippets (`{@render children?.()}`) for slot-like content.
- **JS over TS** — Use Javascript with JSDocs instead of Typescript.

### Accessibility

Consuming apps cannot fix a primitive that is inaccessible, so semantics belong
here, in the component:

- **Every interactive primitive carries its role and state.** Toggles are
  `role="switch"` + `aria-checked`; button groups are `role="group"` with
  `aria-pressed` per option; disclosures pair `aria-expanded` with
  `aria-controls` and an `id` on the panel; `Modal` is `role="dialog"` +
  `aria-modal`.
- **Take the name as a prop, never hard-code English.** The convention is an
  `ariaLabel` prop (plus specific ones such as `closeLabel`, `collapseLabel`,
  `expandLabel`) defaulting to sensible English, so host apps can pass a
  translated string. Do not build a name by string-concatenating in the template.
- **When the visible label is a plain element, tie it to the control.**
  `NamedControl` does this by wrapping the row in `role="group"` with
  `aria-labelledby` pointing at the label span — that one association names
  every toggle, selector and input dropped into its slot.
- **Generate ids with `$props.id()`**, assigned as the *entire* initializer of
  its own `const` (Svelte rejects it inside a template literal), then
  interpolate that variable. `Math.random()` is not SSR-safe.
- **Pointer-only affordances** (drag handles, decorative overlays) get
  `aria-hidden="true"` so they never reach the a11y tree.
- **Emit no `aria-label` rather than an empty or built-up one.** A name prop that
  is unset must resolve to `undefined`, not to `''` or `` `Toggle ${label}` ``.
  `aria-label` **overrides** an ancestor's `aria-labelledby`, so a placeholder
  name does not merely read badly — it destroys the name `NamedControl` was
  supplying. `ToggleSwitch` shipped `"Toggle "` on all 34 call sites for exactly
  this reason.
- **`role` is a contract, so only claim what is implemented.** `role="menu"` +
  `role="menuitem"` promise arrow-key navigation and a roving tabindex; the nav
  panels declared both while being plain Tab-navigated links, so they are now
  `<ul>` disclosures described by `aria-expanded` + `aria-controls`. Prefer the
  weaker, true markup over the stronger, false role.
- **A surface that takes focus has to give it back.** Anything that destroys
  itself — `Modal`, the nav dropdowns, the hamburger menu — returns focus to its
  trigger on close, or focus falls to `<body>` and a keyboard user restarts from
  the top of the document. `Modal` additionally traps Tab and moves focus in on
  open, which is what `aria-modal="true"` already tells assistive tech it does.
- **Help text must be reachable without a pointer.** Tooltips fire on `onfocus`
  as well as hover, live on a real `<button>`, put `role="tooltip"` on the
  *bubble* (not the trigger), tie the two together with `aria-describedby`, and
  dismiss on Escape (1.4.13).
- **Auto-dismissing anything is a time limit (2.2.1).** `Toast` pauses its
  countdown on hover and on focus within, defaults to 8 s rather than 3 s, and
  lets errors persist until dismissed. Timing belongs in the component, not in
  `toastStore` — a store-side timer removes a toast someone is still reading.
- **Error state needs `aria-invalid` and `aria-describedby`, not just a red
  border.** `TextInput` takes `invalid` and `describedBy` props for this; a
  colour-only error fails 1.4.1, and a message that is neither the name nor the
  description reaches assistive tech nowhere at all.

Known gaps, tracked in
[`mb-specs/resources/WCAG-AA-AUDIT-2026-08.md`](../mb-specs/resources/WCAG-AA-AUDIT-2026-08.md):
the `-500` palette steps fail 4.5:1 as text and under white text, `CheckBox` /
`RadioButton` draw no focus ring, and `SearchableList`'s result count is not a
live region. Read that file before changing a colour or a list component.

### Naming Conventions

- **Components**: PascalCase (e.g., `ToggleSwitch.svelte`)
- **Utilities**: camelCase (e.g., `stringUtils.js`)
- **Props/variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE

### Before Making Changes

1. **Read the component** — Do not assume. Open and read the file you intend to modify.
2. **Understand the context** — Check imports, exports, and how the component is used.
3. **Preserve existing patterns** — Match the style and conventions already present.

### After Making Changes

1. **Update this file** if you add new components, utilities, or change folder structure.
2. **Test the build** — Run `npm run build` to ensure no errors.
3. **Update documentation** to DOCUMENTATION.md.

---

## Repository Overview

**@mbsmart/ui** is a private Svelte 5 component library with custom Tailwind theming for MB Smart portal applications.

- **Framework**: Svelte 5 (Runes Mode)
- **Styling**: TailwindCSS v4
- **Package**: `@mbsmart/ui`

---

## Folder Structure

```
src/
├── index.js              # Main entry point (re-exports all)
├── styles.css            # Global styles and Tailwind config
├── components/
│   ├── index.js          # Barrel export for all components
│   ├── atoms/            # Basic building blocks (Button, Badge, Input, NavDropdown, etc.)
│   ├── molecules/        # Composite components (Grid, Island, NamedControl, Tabs)
│   ├── organisms/        # Complex components (Modal, SearchableList, ToastContainer)
│   └── templates/        # Page-level layouts (AppShell, SectionedPage)
├── fonts/                # Poppins + Google Sans (OFL) — WOFF2 subsets,
│                         #   declared in styles.css, one family per script.
│                         #   See "Fonts" below before adding or removing a face.
└── utils/                # Helper functions (dateTime, stringUtils, toastStore, etc.)
```

### Component Hierarchy (Atomic Design)

| Layer       | Purpose                              | Examples                          |
|-------------|--------------------------------------|-----------------------------------|
| **Atoms**   | Single-purpose, primitive UI         | Avatar, Badge, CheckBox, NavDropdown, Spinner, TextInput |
| **Molecules** | Composed of atoms, reusable groups | Grid, HeaderNav, Island, MultiInput |
| **Organisms** | Complex, self-contained features   | Modal, SearchableList, TermsContent, ToastContainer |
| **Templates** | Page layouts and shells            | AppShell, SectionedPage           |

---

## Fonts

`font-sans` is **two typefaces split by script**, and they ship **with this package** —
consumers get them from `@import '@mbsmart/ui/styles.css'` and must never re-declare one
or copy it into their own `static/fonts`.

| Family      | Script / subset  | Locales | Files |
|-------------|------------------|---------|-------|
| Poppins     | latin, latin-ext | en/es/fr and all Latin text | 14 static, ~101 KB |
| Google Sans | cyrillic         | ru      | 2 variable, ~32 KB |
| Google Sans | hebrew           | he, yi  | 2 variable, ~24 KB |

Google Sans replaced **Montserrat** (cyrillic) and **Heebo** (hebrew) in August 2026. One
family now carries both non-Latin scripts, so Hebrew and Russian share letterforms instead
of borrowing two unrelated ones, and it is smaller than the pair it replaced despite adding
a Hebrew italic that Heebo never had.

**Selection is per glyph, not per locale.** Every face carries a `unicode-range`, so the
browser walks `--font-sans` per character and lands on the family that has the glyph — a
Hebrew page with an English product name in it renders Google Sans and Poppins on the same
line. Host apps need **no i18n wiring for fonts at all**; nothing keys off `$language` or
`dir`. It also means a page downloads only the scripts it renders: an English page pulls
three or four latin Poppins faces (~26–35 KB) and never touches Google Sans.

`src/fonts/` holds **WOFF2 only**. Poppins is seven static faces per subset (400/500/600/700
upright plus 400, 600 and 700 italic); Google Sans is one upright and one italic variable
font per subset, declared `font-weight: 400 700`, which is smaller and fewer files than the
equivalent statics.

Before changing this:

- **Do not add a face, subset, or weight without a real usage.** CSS font matching resolves
  an unavailable weight to the nearest available one — `font-extrabold` (one usage, in
  device-portal) correctly renders as 700 in both families. That is the intended
  degradation. Poppins' Devanagari block and Google Sans' `cyrillic-ext` are dropped for
  the same reason; Russian (and Ukrainian) live entirely in the base `cyrillic` range.
  Google Sans ships in ~25 subsets on the Google Fonts API and we take **two** of them:
  do not pull in greek, armenian, thai or the rest without a locale that needs them.
- **Mind the italic weight ramp — a missing italic face is a silent bug.** Poppins has
  400/600/700 italic but **no 500**, so `font-medium` + `italic` resolves *down* to 400 and
  renders at regular weight. This bit us once already: before 700 italic existed, the
  customer-portal hero's `italic` accent span resolved down to 600 and read visibly lighter
  than the upright `font-bold` span next to it in the same `<h1>`. Note the weight is often
  **inherited** from an ancestor rather than sitting on the italic element, so grepping for
  `italic` and `font-bold` in one class attribute will not find these — check computed
  styles, or measure rendered widths per weight in a browser.
- **Do not ship TTF.** WOFF2 is ~70% smaller and universally supported. The per-subset
  WOFF2 files can be pulled straight from the Google Fonts `css2` API with a modern
  browser UA — that is where the current files came from, and the `unicode-range` values in
  `styles.css` are copied verbatim from its output. Otherwise regenerate with
  `pyftsubset SRC.ttf --unicodes=<range> --layout-features='*' --flavor=woff2`.
- **Hebrew italics are now real.** Heebo had no italic at any weight, so Hebrew `<em>` and
  the landing hero's italic accent span used to render as a browser-synthesised oblique
  that slanted right, i.e. against the reading direction in RTL. Google Sans draws a Hebrew
  italic, so both are a designed face. Consumers that worked around the old gap by forcing
  RTL emphasis upright (the brochure did) can drop that workaround.

---

## Corners — `g2` is the house style

Every corner with a radius of 8px or more in this library carries `g2`, a `@utility`
declared in `styles.css` that sets `corner-shape: squircle`. **When you add or edit
markup with a radius, add `g2` alongside it** — subject to three rules that are not
negotiable:

- **`g2` needs a radius on the same element**, or it is a silent no-op.
- **Never on `rounded-full`** — a 50% radius plus `squircle` is an app-icon blob, not a
  circle. Avatars, toggle knobs, radio dots, pills and the Modal drag handle are
  deliberately plain; check the grep before "fixing" one of them.
- **Never on `rounded`/`rounded-sm` (≤ 4px)** — the arc is too short to read.

The reasoning, the `--g2-scale` compensation and the browser-support story are in
[STYLE-GUIDE.md](../mb-specs/resources/STYLE-GUIDE.md#corners--g2-is-the-house-style); the per-component
list is in [DOCUMENTATION.md](DOCUMENTATION.md#css-classes-reference).

---

## The app shell — identity in the header, product in the footer

`AppShell` splits two things that used to share one slot. The header carries the
**signed-in account**: an `Avatar` circle plus `userName`, linking to `userHref`. The
**product name** (`productName`, plus `versionString`) sits in a faded, in-flow footer at
the bottom of the page, where a copyright line would.

This is not cosmetic. The old `title` prop meant "whatever this app wants up there", and
the two portals picked differently — `portal-svelte` passed the technician's login,
`customer-portal-svelte` passed "MB Smart Filtering" — so the same pixel meant two
unrelated things depending on which product you were looking at. Keep the split:

- **Never pass a product name as `userName`.** If an app has no account to show, leave it
  empty; the chip is still the way home.
- **Nav goes in `navItems`, not `headerContent`.** `HeaderNav` renders that one array as
  an icon row on `sm+` and a labelled hamburger menu below it. A snippet cannot be
  re-rendered into a menu with sensible labels, which is why the nav is data.
  `headerContent` is only for controls that must stay in the bar at every width — the
  technician portal's device search is the one real case.
- **The footer is quiet on purpose** (40% / 35% opacity, `select-none`). Passing no
  `productName` removes it entirely.

## Shared preferences — one cookie, every portal

The colour scheme and the language are **estate-wide preferences**: set either one in
any portal and every other portal follows. `utils/preferences.js` is the contract they
share, `utils/theme.js` is the colour scheme, `utils/i18n/languageStore.js` the language.

They are cookies, not `localStorage`, and that is the whole design. The portals are
separate origins — `customer.`, `portal.`, `identity.` and `www.` under `mb-smart.net` —
and one origin cannot read another's `localStorage`. A cookie written with
`Domain=.mb-smart.net` is sent to all of them. Before August 2026 each portal kept its
own copy and none of them agreed: the customer portal in `localStorage`, the technician
portal in a host-only cookie under a different name and a different vocabulary, and the
OAuth portal reading a `localStorage` key that nothing on its origin ever wrote — code
that could not have worked and always fell through to `system`.

Things worth knowing before touching this:

- **`setTheme` / `setLanguage` are the only writers.** Both go through
  `writePreference`, which is where the `Domain` is decided. A direct `Cookies.set`
  writes a host-only cookie that only the portal that wrote it will ever see.
- **A zone-wide cookie does not overwrite a host-only one of the same name.** Cookie
  identity is (name, domain, path), so the browser keeps both and returns the older —
  the host-only twin — pinning that one portal to a stale value forever.
  `writePreference` deletes the twin first. This is the trap the whole file exists to
  avoid; do not bypass it.
- **Off-zone hosts degrade to host-only, deliberately.** `localhost`, `*.pages.dev`
  previews (a public suffix) and `prod-test-customer.mbsmart.net` (the **un**hyphenated
  zone) cannot share a cookie with anything. Each remembers its own preference. A
  preview is therefore the one place this feature cannot be verified.
- **The pre-paint readers cannot be imported from here.** `<html>` needs its `dark`
  class and its `lang`/`dir` before the first paint, which means an inline `<script>` in
  each app's `app.html`, running before any module loads. Those snippets are hand-copied
  and have to be mirrored on any change to a cookie name or vocabulary — the canonical
  copies are in DOCUMENTATION.md. Four repos, not one.
- **A setting only one portal has does not belong here.** The technician portal's
  `mb_setting_*` cookies stay host-only.

## i18n — two data shapes, one engine

`src/utils/i18n/` is the shared translation engine. Consumers register their own strings;
this package ships two namespaces of its own — `safety.*` (`safetyTranslations.js`, used
by `SafetyBadge`) and `auth.*` (`authTranslations.js`, the estate-wide sign-in / sign-out
vocabulary). Both shapes below resolve through the same `t` / `tr` / `getTranslation`.

`auth.*` is here rather than in each app because it was in each app, four times, spelled
four ways — "Login", "Log In", "Sign In", "Logout", "Log out", "Sign out" all shipped at
once, and the five translations inherited the drift on top of their own. The house rule is
"Sign in" / "Sign out", sentence case, hyphenated before a noun ("sign-in code"); the
reasoning and the enforcement live in `../mb-specs/resources/STYLE-GUIDE.md`. Each app
registers it beside its locale loaders. **Consumers must not re-author these keys
locally** — locale-first wins over key-first, so a local copy shadows the shared one
silently, which is exactly the failure this namespace exists to remove.

**key-first** — `{ ns: { key: { en, es, fr, he, ru, yi } } }`, registered eagerly with
`registerTranslations()`. Pleasant to author (all six languages side by side) but it is
one module carrying every language, so every visitor downloads all of them. Fine for a
handful of shared strings; that is why `safetyTranslations` and `authTranslations` both
use it — five and nine strings respectively, and a header's sign-out button must have a
label before any locale chunk has landed.

**locale-first** — `{ ns: { key: 'value' } }`, one module per language, registered as lazy
loaders with `registerLocaleLoaders({ en: () => import(…), … })` and pulled in with
`await loadLanguage(lang)`. This is what an app's full dictionary should use. See
`localeRegistry.js`.

When both define a key, locale-first wins, so an app can migrate a namespace at a time.

Things worth knowing before touching this:

- **`await loadLanguage()` in the layout `load`**, not in a component. The first frame
  renders against whatever is in memory; awaiting in `load` is what makes the split
  invisible. `setLanguage()` also kicks off the fetch on its own (fire-and-forget) for
  callers with no route to hang it off, such as a picker on an unprefixed SPA route.
- **`t` derives from `i18nVersion` as well as `language`.** Chunks arrive asynchronously;
  a store derived from the language alone would never re-run for one that lands after the
  switch. Any new registration path must call `bumpI18nVersion()`.
- **Fallback order** is requested language → key-first → English → any other loaded
  locale. The last step is deliberate: during the tick between a language switch and its
  chunk arriving, the page keeps the language it was already showing instead of a wall of
  raw dotted keys.
- **`getAvailableLanguages()` reports what is in memory**, which with locale-first data is
  only the loaded chunks. Use `SUPPORTED_LANGUAGES` (or `getRegisteredLocales()`) to
  enumerate what an app offers.

---

## The legal documents — content here, chrome in the app

`components/organisms/TermsContent.svelte` is the **estate-wide single source of
truth for the Terms & Conditions body**, and `utils/legal.js` is the house style
the legal documents share. Both are here rather than in an app because more than
one app has to show the same document and they were already drifting: the
customer portal rendered its own copy while the technician portal's device form
linked out to a separate one on the marketing site.

- **The component renders the body and nothing else** — no title, no revision
  line, no wrapper. Each surface frames it differently (a public page with a
  sidebar TOC, an informational modal, an acceptance gate with a scroll
  sentinel), so the frame belongs to the host. It takes no props; do not add a
  variant prop to accommodate a new surface.
- **`legalProse` must hold literal Tailwind class strings.** The consuming app's
  Tailwind build scans this package's `dist` and emits only what it can see
  spelled out. Compose one of these at runtime and the class attribute still
  renders while the CSS behind it silently does not exist. This is also why an
  app cannot use these without `@source '../../node_modules/@mbsmart/ui/dist'`
  in its CSS — of the four portals only `customer-portal-svelte` has that line.
- **English-only, `dir="ltr"`, never translated or mirrored.** Do not wire the
  Terms into i18n. The host tells non-English readers why; the customer portal
  uses its own `LegalLanguageNotice` for that.
- **Section heading `id`s are a public API.** Hosts link to them from a table of
  contents; renaming one breaks every deep link into the document.
- **The revision date lives in `TERMS_LAST_UPDATED`, not in markup.** Note it is
  a display string and is *not* the same thing as the `terms_version` the API
  records against a customer's acceptance — if you change what the document
  says, both have to move, and they are not currently connected.

---

## For LLMs: How to Learn More

**Do not rely on this file for component details.** Instead:

1. **Read the component source** — Open `src/components/{layer}/{Component}.svelte`
2. **Check DOCUMENTATION.md** — Contains full API reference with props, usage examples, and behaviours. If you happen to notice that the component source has diverged from DOCUMENTATION.md, *update DOCUMENTATION.md*.
3. **Review index.js files** — Understand exports and available components

Example: To understand the `Modal` component, read:
- `src/components/organisms/Modal.svelte`
- The Modal section in `DOCUMENTATION.md`
