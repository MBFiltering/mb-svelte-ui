# @mbsmart/ui

A private Svelte 5 component library with custom Tailwind theming for MB Smart portal applications.

## Installation

Since this is a private package, install directly from GitHub:

```bash
# Using HTTPS (will prompt for credentials or use token)
npm install git+https://github.com/MBFiltering/mb-svelte-ui.git

# Using SSH (requires SSH key setup)
npm install git+ssh://git@github.com:MBFiltering/mb-svelte-ui.git

# Or add to package.json dependencies directly:
# "dependencies": {
#   "@mbsmart/ui": "github:MBFiltering/mb-svelte-ui"
# }
```

To install a specific version (tag or branch):

```bash
# Install specific tag
npm install git+https://github.com/MBFiltering/mb-svelte-ui.git#v0.1.0

# Install specific branch
npm install git+https://github.com/MBFiltering/mb-svelte-ui.git#main
```

**Note:** Update the GitHub URL above to match your actual repository location.

## Usage

### 1. Import the styles

In your main CSS file or root layout, import the package styles:

```css
/* In your app.css or main CSS file */
@import '@mbsmart/ui/styles.css';
```

Or in your root `+layout.svelte`:

```svelte
<script>
	import '@mbsmart/ui/styles.css';
</script>
```

### 2. Import components

```svelte
<script>
	import { Island, ToggleSwitch, ControlButton } from '@mbsmart/ui';
	// Or import from specific categories:
	import { CheckBox, Spinner } from '@mbsmart/ui/atoms';
	import { Grid, NamedControl } from '@mbsmart/ui/molecules';
	import { Modal, ToastContainer } from '@mbsmart/ui/organisms';
	import { SectionedPage } from '@mbsmart/ui/templates';
</script>
```

### 3. Import utilities

```svelte
<script>
	import { toast, formatDate, fuzzyMatch } from '@mbsmart/ui/utils';

	// Show a toast notification
	toast.success('Settings saved!');
</script>
```

## Peer Dependencies

This package requires the following peer dependencies:

- `svelte` ^5.0.0
- `@lucide/svelte`

Make sure to install them in your project:

```bash
npm install svelte @lucide/svelte
```

**Fonts need no setup in consuming projects — including for i18n.** `font-sans` covers
every locale we support: Poppins for Latin (en/es/fr) and Arimo for Cyrillic (ru) and
Hebrew (he/yi). Both ship inside this package as WOFF2 subsets and are declared by
`styles.css` with relative `./fonts/…` URLs, so your bundler resolves and fingerprints them
for you.

The right family is picked **per character** by `unicode-range`, so there is nothing to
wire up: no `:lang()` rules, no switching on `$language` or `dir`, and mixed-script text
(an English product name inside a Hebrew sentence) renders correctly on its own. Pages
download only the scripts they actually render.

Do not copy the fonts into `static/fonts` and do not re-declare `@font-face` for either
family — a second declaration with absolute paths just downloads it twice.

Importing the stylesheet is the whole of it:

```css
@import '@mbsmart/ui/styles.css';
@import 'tailwindcss';

@source "../node_modules/@mbsmart/ui/dist"; /* use your actual path to node_modules */
```

See the "Typography" section of [STYLE-GUIDE.md](../mb-specs/resources/STYLE-GUIDE.md) for which faces ship and why.

## Style guide

[STYLE-GUIDE.md](../mb-specs/resources/STYLE-GUIDE.md) in `mb-specs` is the canonical house style for
this package **and** every app that consumes it: the palette and its semantics, light↔dark mappings, the `g2`
corner rules, typography, RTL, accessibility, browser tab titles and naming conventions.
Read it before adding a colour, a radius or a title.

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# The built package will be in the dist/ folder
```

## License

Private - MB Smart
