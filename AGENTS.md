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
│   ├── atoms/            # Basic building blocks (Button, Badge, Input, etc.)
│   ├── molecules/        # Composite components (Grid, Island, NamedControl)
│   ├── organisms/        # Complex components (Modal, SearchableList, ToastContainer)
│   └── templates/        # Page-level layouts (AppShell, SectionedPage)
├── fonts/                # Custom fonts (JetBrains Mono)
└── utils/                # Helper functions (dateTime, stringUtils, toastStore, etc.)
```

### Component Hierarchy (Atomic Design)

| Layer       | Purpose                              | Examples                          |
|-------------|--------------------------------------|-----------------------------------|
| **Atoms**   | Single-purpose, primitive UI         | Badge, CheckBox, Spinner, TextInput |
| **Molecules** | Composed of atoms, reusable groups | Grid, Island, MultiInput          |
| **Organisms** | Complex, self-contained features   | Modal, SearchableList, ToastContainer |
| **Templates** | Page layouts and shells            | AppShell, SectionedPage           |

---

## For LLMs: How to Learn More

**Do not rely on this file for component details.** Instead:

1. **Read the component source** — Open `src/components/{layer}/{Component}.svelte`
2. **Check DOCUMENTATION.md** — Contains full API reference with props, usage examples, and behaviours. If you happen to notice that the component source has diverged from DOCUMENTATION.md, *update DOCUMENTATION.md*.
3. **Review index.js files** — Understand exports and available components

Example: To understand the `Modal` component, read:
- `src/components/organisms/Modal.svelte`
- The Modal section in `DOCUMENTATION.md`