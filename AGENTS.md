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

`font-sans` is **three typefaces, one per script**, and they ship **with this package** —
consumers get them from `@import '@mbsmart/ui/styles.css'` and must never re-declare one
or copy it into their own `static/fonts`.

| Family     | Script / subset  | Locales | Files |
|------------|------------------|---------|-------|
| Poppins    | latin, latin-ext | en/es/fr and all Latin text | 12 static, ~86 KB |
| Montserrat | cyrillic         | ru      | 2 variable, ~48 KB |
| Rubik      | hebrew           | he, yi  | 2 variable, ~19 KB |

**Selection is per glyph, not per locale.** Every face carries a `unicode-range`, so the
browser walks `--font-sans` per character and lands on the family that has the glyph — a
Hebrew page with an English product name in it renders Rubik and Poppins on the same line.
Host apps need **no i18n wiring for fonts at all**; nothing keys off `$language` or `dir`.
It also means a page downloads only the scripts it renders: an English page pulls three or
four latin Poppins faces (~26–35 KB) and never touches Montserrat or Rubik.

`src/fonts/` holds **WOFF2 only**. Poppins is six static faces per subset (400/500/600/700
upright plus 400 and 600 italic); Montserrat and Rubik are variable fonts declared
`font-weight: 400 700`, which is smaller and fewer files than the equivalent statics.

Before changing this:

- **Do not add a face, subset, or weight without a real usage.** CSS font matching resolves
  an unavailable weight to the nearest available one — `font-extrabold` (one usage, in
  device-portal) correctly renders as 700 in all three families. That is the intended
  degradation. Poppins' Devanagari block and Montserrat's `cyrillic-ext` are dropped for
  the same reason; Russian (and Ukrainian) live entirely in the base `cyrillic` range.
- **Do not ship TTF.** WOFF2 is ~70% smaller and universally supported. The per-subset
  WOFF2 files can be pulled straight from the Google Fonts `css2` API with a modern
  browser UA — that is where the current files came from, and the `unicode-range` values in
  `styles.css` are copied verbatim from its output. Otherwise regenerate with
  `pyftsubset SRC.ttf --unicodes=<range> --layout-features='*' --flavor=woff2`.
- **Hebrew needs a family with real italics.** Heebo is the obvious candidate and ships
  **no italic face at any weight**, so `<em>` would be synthesised (obliqued). Rubik has
  true italics at the full 400–700 range, which is why it won.

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
