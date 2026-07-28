# AGENTS.md

> **Living Document**: Any AI agent making changes to this repository, or receives new maxims from the human, **must** update this file accordingly.

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
├── fonts/                # Poppins (OFL) — WOFF2 subsets, declared in styles.css
│                         #   See "Fonts" below before adding or removing a face.
└── utils/                # Helper functions (dateTime, stringUtils, toastStore, etc.)
```

### Component Hierarchy (Atomic Design)

| Layer       | Purpose                              | Examples                          |
|-------------|--------------------------------------|-----------------------------------|
| **Atoms**   | Single-purpose, primitive UI         | Badge, CheckBox, NavDropdown, Spinner, TextInput |
| **Molecules** | Composed of atoms, reusable groups | Grid, Island, MultiInput          |
| **Organisms** | Complex, self-contained features   | Modal, SearchableList, ToastContainer |
| **Templates** | Page layouts and shells            | AppShell, SectionedPage           |

---

## Fonts

Poppins is the UI face (`font-sans`) and ships **with this package** — consumers get it
from `@import '@mbsmart/ui/styles.css'` and must never re-declare it or copy it into their
own `static/fonts`.

`src/fonts/` holds **WOFF2 only**, and only the six faces the portals actually render:
400/500/600/700 upright plus 400 and 600 italic. Each is split into the two Google Fonts
subsets Poppins covers and our locales need — latin and latin-ext — with matching
`unicode-range`, so a page downloads only the subsets it renders. Twelve files, ~86 KB
total; a typical English page pulls three or four latin faces (~26–35 KB).

Before changing this:

- **Do not add a face back without a real usage.** CSS font matching resolves an
  unavailable weight to the nearest available one — `font-extrabold` (one usage, in
  device-portal) correctly renders as 700. That is the intended degradation.
- **Do not ship TTF.** WOFF2 is ~70% smaller and universally supported. Regenerate with
  `pyftsubset SRC.ttf --unicodes=<range> --layout-features='*' --flavor=woff2`.
- **Poppins has no Cyrillic and no Hebrew glyphs**, so ru/he/yi fall through to
  `system-ui` for body text. That predates the subsetting; dropping the Devanagari block
  (no locale uses it) is the only coverage actually removed.

---

## i18n — two data shapes, one engine

`src/utils/i18n/` is the shared translation engine. Consumers register their own strings;
this package ships only the `safety.*` namespace (`safetyTranslations.js`, used by
`SafetyBadge`). Both shapes below resolve through the same `t` / `tr` / `getTranslation`.

**key-first** — `{ ns: { key: { en, es, fr, he, ru, yi } } }`, registered eagerly with
`registerTranslations()`. Pleasant to author (all six languages side by side) but it is
one module carrying every language, so every visitor downloads all of them. Fine for a
handful of shared strings; that is why `safetyTranslations` still uses it.

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

## For LLMs: How to Learn More

**Do not rely on this file for component details.** Instead:

1. **Read the component source** — Open `src/components/{layer}/{Component}.svelte`
2. **Check DOCUMENTATION.md** — Contains full API reference with props, usage examples, and behaviours. If you happen to notice that the component source has diverged from DOCUMENTATION.md, *update DOCUMENTATION.md*.
3. **Review index.js files** — Understand exports and available components

Example: To understand the `Modal` component, read:
- `src/components/organisms/Modal.svelte`
- The Modal section in `DOCUMENTATION.md`
