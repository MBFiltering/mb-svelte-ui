# @mbsmart/ui

A private Svelte 5 component library with custom Tailwind theming for MB Smart portal applications.

## Installation

Since this is a private package, install directly from GitHub:

```bash
# Using HTTPS (will prompt for credentials or use token)
npm install git+https://github.com/gitmorgen/mb-ui.git

# Using SSH (requires SSH key setup)
npm install git+ssh://git@github.com:gitmorgen/mb-ui.git

# Or add to package.json dependencies directly:
# "dependencies": {
#   "@mbsmart/ui": "github:gitmorgen/mb-ui"
# }
```

To install a specific version (tag or branch):

```bash
# Install specific tag
npm install git+https://github.com/gitmorgen/mb-ui.git#v0.1.0

# Install specific branch
npm install git+https://github.com/gitmorgen/mb-ui.git#main
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

**For consuming projects**, you need to copy the fonts to your static folder:

```bash
# Copy fonts from package to your static folder
cp -r node_modules/@mbsmart/ui/dist/fonts/* static/fonts/
```

Then create a `fonts.css` in your `src/` with absolute paths:

```css
/* src/fonts.css */
@font-face {
	font-family: 'Poppins';
	src: url('/fonts/Poppins-Regular.ttf') format('truetype');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}
/* ... repeat for other weights */
```

And import it in your `app.css`:

```css
@import '@mbsmart/ui/styles.css';
@import './fonts.css'; /* Override package font paths */
@import 'tailwindcss';

@source "../node_modules/@mbsmart/ui/dist"; /* use your actual path to node_modules */
```

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
