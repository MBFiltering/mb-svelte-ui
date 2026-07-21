# @mbsmart/ui - Component & Utilities Documentation

> Complete reference documentation for all components and utilities in the @mbsmart/ui package.

**Package Version**: 0.1.18  
**Framework**: Svelte 5 (Runes Mode)  
**Styling**: TailwindCSS v4

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Atoms (Basic Components)](#atoms)
   - [Badge](#badge)
   - [Callout](#callout)
   - [CheckBox](#checkbox)
   - [CircleButton](#circlebutton)
   - [Clipboard](#clipboard)
   - [ControlButton](#controlbutton)
   - [ExternalLinkText](#externallinktext)
   - [Info](#info)
   - [JSONPrint](#jsonprint)
   - [Kbd](#kbd)
   - [NavButton](#navbutton)
	- [NavDropdown](#navdropdown)
   - [OneFromMany](#onefrommany)
   - [RadioButton](#radiobutton)
   - [SafetyBadge](#safetybadge)
   - [SingleInput](#singleinput)
   - [Skeleton](#skeleton)
   - [Spinner](#spinner)
   - [SvgIcon](#svgicon)
   - [TextInput](#textinput)
   - [TextLink](#textlink)
   - [Toast](#toast)
   - [ToggleSwitch](#toggleswitch)
   - [VisibilityToggle](#visibilitytoggle)
3. [Molecules (Composite Components)](#molecules)
	- [DeviceCard](#devicecard)
   - [Grid](#grid)
   - [Island](#island)
	- [ListCard](#listcard)
   - [MultiInput](#multiinput)
   - [NamedControl](#namedcontrol)
   - [Tabs](#tabs)
4. [Organisms (Complex Components)](#organisms)
   - [Modal](#modal)
   - [QuickLinks](#quicklinks)
   - [SearchableList](#searchablelist)
   - [ToastContainer](#toastcontainer)
5. [Templates (Page Layouts)](#templates)
   - [AppShell](#appshell)
   - [ErrorPage](#errorpage)
   - [SectionedPage](#sectionedpage)
6. [Utilities](#utilities)
   - [categoryColors](#categorycolors)
   - [dateTime](#datetime)
   - [labels](#labels)
   - [stringUtils](#stringutils)
   - [toastStore](#toaststore)
   - [urlUtils](#urlutils)

---

## Installation & Setup

### Install from GitHub

```bash
# Using HTTPS
npm install git+https://github.com/MBFiltering/mb-svelte-ui.git

# Using SSH
npm install git+ssh://git@github.com:MBFiltering/mb-svelte-ui.git

# Or add to package.json
"dependencies": {
  "@mbsmart/ui": "github:MBFiltering/mb-svelte-ui"
}
```

### Import Styles

Add to your main CSS file or root layout:

```css
@import '@mbsmart/ui/styles.css';
```

### Peer Dependencies

Ensure these are installed in your project:

```bash
npm install svelte@^5.0.0 @lucide/svelte@>=0.400.0
```

---

## Atoms

Basic building blocks - simple, single-purpose components.

### Badge

Small outlined indicator pill for status labels like Pro/Basic, Paid/Unpaid.

**Import:**

```svelte
<script>
	import { Badge } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type      | Default   | Description                                                                                  |
| ----------- | --------- | --------- | -------------------------------------------------------------------------------------------- |
| `color`     | `string`  | `'azure'` | Color variant: `'azure'`, `'mulberry'`, `'green'`, `'red'`, `'orange'`, `'yellow'`, `'gray'` |
| `size`      | `string`  | `'small'` | Size variant: `'small'`, `'tiny'`                                                            |
| `className` | `string`  | `''`      | Additional CSS classes                                                                       |
| `children`  | `snippet` | -         | Badge content                                                                                |

**Usage:**

```svelte
<!-- PRO/BASIC indicators -->
<Badge color="mulberry">PRO</Badge>
<Badge color="gray">BASIC</Badge>

<!-- Payment status -->
<Badge color="green" size="small">Paid</Badge>
<Badge color="red" size="tiny">Unpaid</Badge>

<!-- Custom label -->
<Badge color="orange">BETA</Badge>
```

**Styling:**

Badges have a light background with matching border and text color. Dark mode support is built-in.

---

### Callout

Styled container with colored left border for announcements, tips, warnings, and other highlighted content.

**Import:**

```svelte
<script>
	import { Callout } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type      | Default   | Description                                                                    |
| ----------- | --------- | --------- | ------------------------------------------------------------------------------ |
| `color`     | `string`  | `'azure'` | Color variant: `'orange'`, `'azure'`, `'red'`, `'green'`, `'yellow'`, `'gray'` |
| `className` | `string`  | `''`      | Additional CSS classes                                                         |
| `children`  | `snippet` | -         | Callout content                                                                |

**Usage:**

```svelte
<!-- Warning callout -->
<Callout color="orange">
	<p>Warning: This action cannot be undone.</p>
</Callout>

<!-- Info/tip callout -->
<Callout color="azure">
	<p class="font-semibold">Did you know?</p>
	<p>You can use keyboard shortcuts for faster navigation.</p>
</Callout>

<!-- Success callout -->
<Callout color="green">
	<p>Your changes have been saved successfully.</p>
</Callout>

<!-- Error callout -->
<Callout color="red">
	<p>There was an error processing your request.</p>
</Callout>
```

**Styling:**

Callouts have a 4px left border, subtle background tint, and matching text color. Dark mode adjusts colors appropriately.

---

### CheckBox

Custom checkbox with Lucide icons supporting checked, unchecked, and indeterminate states.

**Import:**

```svelte
<script>
	import { CheckBox } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop            | Type       | Default    | Description                       |
| --------------- | ---------- | ---------- | --------------------------------- |
| `checked`       | `boolean`  | `false`    | Whether the checkbox is checked   |
| `indeterminate` | `boolean`  | `false`    | Shows minus icon instead of check |
| `disabled`      | `boolean`  | `false`    | Disables interaction              |
| `ariaLabel`     | `string`   | `''`       | Accessibility label               |
| `onclick`       | `function` | `() => {}` | Click handler                     |

**Usage:**

```svelte
<CheckBox checked={isSelected} onclick={() => (isSelected = !isSelected)} ariaLabel="Select item" />

<!-- Indeterminate state (for "some selected") -->
<CheckBox indeterminate={true} onclick={toggleAll} />
```

---

### Clipboard

Copy-to-clipboard button with visual feedback.

**Import:**

```svelte
<script>
	import { Clipboard } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop       | Type      | Default    | Description                                             |
| ---------- | --------- | ---------- | ------------------------------------------------------- |
| `content`  | `string`  | `''`       | Text to copy to clipboard                               |
| `color`    | `string`  | `'ghost2'` | Passed through to the internal `CircleButton` color prop |
| `children` | `snippet` | -          | Optional clickable content                              |

**Usage:**

```svelte
<!-- Icon button only -->
<Clipboard content="Text to copy" />

<!-- Override the internal CircleButton color variant -->
<Clipboard content="Text to copy" color="azure" />

<!-- With clickable content -->
<Clipboard content={device.id}>
	<span class="font-mono">{device.id}</span>
</Clipboard>
```

---

### CircleButton

Circular icon button with color and size variants. Used for inline actions like edit, save, cancel.

**Import:**

```svelte
<script>
	import { CircleButton } from '@mbsmart/ui/atoms';
	import { Pencil, Check, X } from '@lucide/svelte';
</script>
```

**Props:**

| Prop       | Type        | Default    | Description                                                                   |
| ---------- | ----------- | ---------- | ----------------------------------------------------------------------------- |
| `onclick`  | `function`  | `() => {}` | Click handler                                                                            |
| `disabled` | `boolean`   | `false`    | Disables the button                                                                      |
| `title`    | `string`    | `''`       | Tooltip text                                                                             |
| `type`     | `string`    | `'button'` | Button type: `'button'`, `'submit'`, `'reset'`                                           |
| `color`    | `string`    | `'ghost'`  | Color variant: `'ghost'`, `'ghost2'`, `'azure'`, `'green'`, `'red'`, `'orange'`, `'gray'` |
| `size`     | `string`    | `'md'`     | Size variant: `'sm'`, `'md'`, `'lg'`                                                     |
| `icon`     | `Component` | -          | Lucide icon component                                                                    |
| `iconSize` | `number`    | `18`       | Size of the icon in pixels                                                               |
| `className`| `string`    | `''`       | Additional CSS classes                                                                   |

**Usage:**

```svelte
<!-- Ghost button (default) - transparent background with hover effect -->
<CircleButton onclick={startEditing} title="Edit" icon={Pencil} />

<!-- Colored button for primary actions -->
<CircleButton onclick={save} color="azure" title="Save" icon={Check} />

<!-- Disabled state -->
<CircleButton onclick={cancel} disabled={isSaving} title="Cancel" icon={X} />

<!-- Custom icon size -->
<CircleButton onclick={doSomething} icon={Pencil} iconSize={24} size="lg" />
```

---

### ControlButton

Styled button with color and size variants.

**Import:**

```svelte
<script>
	import { ControlButton } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type       | Default    | Description                                                        |
| ----------- | ---------- | ---------- | ------------------------------------------------------------------ |
| `onclick`   | `function` | `() => {}` | Click handler                                                      |
| `disabled`  | `boolean`  | `false`    | Disables the button                                                |
| `color`     | `string`   | `'azure'`  | Color variant: `'azure'`, `'green'`, `'orange'`, `'red'`, `'gray'`, `'black'`, `'transparent'` |
| `size`      | `string`   | `'md'`     | Size variant: `'sm'`, `'md'`, `'lg'`                               |
| `type`      | `string`   | `'button'` | Button type: `'button'`, `'submit'`, `'reset'`                     |
| `className` | `string`   | `''`       | Additional CSS classes                                             |
| `children`  | `snippet`  | -          | Button content                                                     |

**Usage:**

```svelte
<ControlButton onclick={handleSave} color="green" size="md">Save Changes</ControlButton>

<ControlButton onclick={handleDelete} color="red" disabled={isDeleting}>
	{isDeleting ? 'Deleting...' : 'Delete'}
</ControlButton>

<!-- Submit button in a form -->
<form onsubmit={handleSubmit}>
	<ControlButton type="submit" color="azure">Submit</ControlButton>
</form>

<!-- Gray variant for neutral actions -->
<ControlButton color="gray" onclick={handleCancel}>Cancel</ControlButton>
```

---

### ExternalLinkText

External link with icon that opens in a new tab.

**Import:**

```svelte
<script>
	import { ExternalLinkText } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type     | Default            | Description         |
| ----------- | -------- | ------------------ | ------------------- |
| `href`      | `string` | `''`               | Link URL            |
| `text`      | `string` | `''`               | Link text           |
| `className` | `string` | `'text-azure-700'` | CSS classes         |
| `iconSize`  | `number` | `18`               | Icon size in pixels |

**Usage:**

```svelte
<ExternalLinkText href="https://example.com" text="Visit Website" />
```

---

### Info

Tooltip or inline info component with a directory of predefined help texts.

**Import:**

```svelte
<script>
	import { Info } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop      | Type     | Default     | Description                                |
| --------- | -------- | ----------- | ------------------------------------------ |
| `label`   | `string` | `''`        | Key to look up in the info directory       |
| `variant` | `string` | `'tooltip'` | Display variant: `'tooltip'` or `'inline'` |

**Usage:**

```svelte
<!-- Tooltip on hover -->
<Info label="Device Protection" />

<!-- Inline text display -->
<Info label="Device Protection" variant="inline" />
```

**Built-in Labels:**
The component has a built-in directory of help texts for common labels like:

- `'Device Protection'`
- `'Bypass App Approval Requests'`
- Category-specific help (e.g., `'Banks_app'`, `'Torah_site'`)

---

### JSONPrint

Pretty-print JSON data in a preformatted block.

**Import:**

```svelte
<script>
	import { JSONPrint } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop   | Type  | Default | Description             |
| ------ | ----- | ------- | ----------------------- |
| `data` | `any` | -       | Data to display as JSON |

**Usage:**

```svelte
<JSONPrint data={apiResponse} />
```

---

### Kbd

Keyboard shortcut display badge.

**Import:**

```svelte
<script>
	import { Kbd } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop       | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `children` | `snippet` | -       | Keyboard shortcut text |

**Usage:**

```svelte
<Kbd>Alt + Shift + K</Kbd>

<p>Press <Kbd>ESC</Kbd> to close</p>
```

**Note:** Elements with this component have the `kbd-helper` class and can be hidden via the `html.hide-kbd` class.

### NavButton

Navigation button or link for headers, toolbars, and navigation actions. Supports color variants and Lucide icons.

**Import:**

```svelte
<script>
	import { NavButton } from '@mbsmart/ui/atoms';
	import { LogOut, Settings, UserRoundPlus } from '@lucide/svelte';
</script>
```

**Props:**

| Prop        | Type      | Default   | Description                                    |
| ----------- | --------- | --------- | ---------------------------------------------- |
| `href`      | string    | `null`    | Link destination (renders as `<a>` if set)     |
| `onclick`   | function  | `null`    | Click handler (renders as `<button>` if set)   |
| `icon`      | component | `null`    | Lucide icon component (e.g. `LogOut`)          |
| `label`     | string    | `''`      | Button/link label text                         |
| `title`     | string    | `''`      | Tooltip text                                   |
| `color`     | string    | `'azure'` | Color variant: `azure`, `red`, `green`, `gray` |
| `className` | string    | `''`      | Additional CSS classes                         |
| `disabled`  | boolean   | `false`   | Disabled state                                 |

**Usage:**

```svelte
<!-- Link variant -->
<NavButton href="/dashboard/settings" icon={Settings} label="Settings" color="azure" />

<!-- Button variant -->
<NavButton onclick={logout} icon={LogOut} label="Logout" color="red" />

<!-- Custom color -->
<NavButton href="/dashboard/device/new" icon={UserRoundPlus} label="New Device" color="green" />
```

**Notes:**

- Responsive: label is hidden on small screens, shown on `lg` and up.
- Always use Lucide icons for consistency.
- Use for navigation actions in headers, toolbars, and page layouts.

### NavDropdown

Dropdown group of navigation actions. The trigger matches `NavButton` styling and opens a menu of button or link entries using the same config shape as `NavButton`.

**Import:**

```svelte
<script>
	import { NavDropdown } from '@mbsmart/ui/atoms';
	import { Folder, LogOut, Settings, UserRoundPlus } from '@lucide/svelte';
</script>
```

**Props:**

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `config` | `array` | `[]` | Array of nav items using the `NavButton` prop shape: `{ href, onclick, icon, label, title, color, disabled, className }` |
| `icon` | `component` | `null` | Lucide icon component shown in the trigger |
| `label` | `string` | `''` | Trigger label text |
| `title` | `string` | `''` | Trigger tooltip and accessible label |
| `color` | `string` | `'azure'` | Trigger color variant: `azure`, `red`, `green`, `gray` |
| `disabled` | `boolean` | `false` | Disables the trigger |
| `className` | `string` | `''` | Additional CSS classes for the trigger |
| `dropdownClassName` | `string` | `''` | Additional CSS classes for the dropdown container |

**Usage:**

```svelte
<script>
	const navItems = [
		{ href: '/dashboard/device/new', icon: UserRoundPlus, label: 'New Device', color: 'green' },
		{ href: '/dashboard/settings', icon: Settings, label: 'Settings', color: 'azure' },
		{ onclick: logout, icon: LogOut, label: 'Logout', color: 'red' }
	];
</script>

<NavDropdown
	icon={Folder}
	label="Actions"
	title="Open navigation actions"
	color="azure"
	config={navItems}
/>
```

**Notes:**

- The trigger uses the same visual language and responsive label behavior as `NavButton`.
- Each dropdown item can be a link or button, based on the same `href` and `onclick` rules as `NavButton`.
- The dropdown closes on item selection, outside click, or `Escape`.

Segmented button selector for choosing one option from a list.

**Import:**

```svelte
<script>
	import { OneFromMany } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop       | Type       | Default    | Description                                    |
| ---------- | ---------- | ---------- | ---------------------------------------------- |
| `options`  | `array`    | `[]`       | Array of option objects (see below)            |
| `selected` | `string`   | `''`       | Currently selected value                       |
| `value`    | `string`   | `''`       | Alias for `selected` (backwards compatibility) |
| `onChange` | `function` | `() => {}` | Callback with new value                        |
| `onSelect` | `function` | `() => {}` | Alias for `onChange`                           |
| `disabled` | `boolean`  | `false`    | Disables all options                           |
| `visibleCount` | `number` | `2` | How many options render as visible buttons; when `options.length > visibleCount` the last visible slot becomes a dropdown containing the remaining options. Values `<= 1` render a single fully clickable dropdown control |

**Option object:**

| Field        | Type      | Description |
| ------------ | --------- | ----------- |
| `value`      | `string`  | Option value (required) |
| `label`      | `string`  | Display label |
| `color`      | `string`  | Tailwind bg class when selected |
| `textColor`  | `string`  | Text color when selected (defaults to `'text-white'`) |
| `disabled`   | `boolean` | When true, this option cannot be selected (permission-gating, etc.) |
| `cursor`     | `string`  | Optional Tailwind cursor class when the option is interactive |

**Usage:**

```svelte
<script>
	let status = 'blocked';

	const options = [
		{ value: 'blocked', label: 'Blocked', color: 'bg-red-alt-500', disabled: true },
		{ value: 'allowed', label: 'Allowed', color: 'bg-green-alt-500', textColor: 'text-white' },
		{ value: 'filtered', label: 'Filtered', color: 'bg-azure-500', disabled: !canFilter }
	];
</script>

<OneFromMany {options} selected={status} onChange={(val) => (status = val)} />
```

**Behavior:**

- Shows up to `visibleCount` options as visible controls (default `2`)
- When `options.length > visibleCount` the last visible slot becomes a dropdown containing the remaining options
- When `visibleCount <= 1`, the component renders as a single fully clickable dropdown control
- Remembers last dropdown selection for toggle behavior
- Per-option `disabled` greys out that choice and blocks selection; global `disabled` still disables the whole control

---

### RadioButton

Custom radio button with azure-700 styling.

**Import:**

```svelte
<script>
	import { RadioButton } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type       | Default    | Description               |
| ----------- | ---------- | ---------- | ------------------------- |
| `checked`   | `boolean`  | `false`    | Whether radio is selected |
| `disabled`  | `boolean`  | `false`    | Disables interaction      |
| `name`      | `string`   | `''`       | Radio group name          |
| `value`     | `string`   | `''`       | Radio value               |
| `ariaLabel` | `string`   | `''`       | Accessibility label       |
| `onchange`  | `function` | `() => {}` | Change handler            |

**Usage:**

```svelte
<RadioButton
	name="priority"
	value="high"
	checked={priority === 'high'}
	onchange={() => (priority = 'high')}
/>
```

---

### SafetyBadge

Risk level badge with color-coded styling.

**Import:**

```svelte
<script>
	import { SafetyBadge } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type      | Default | Description                                                        |
| ----------- | --------- | ------- | ------------------------------------------------------------------ |
| `colorKey`  | `string`  | `''`    | Direct color: `'green'`, `'yellow'`, `'orange'`, `'red'`, `'gray'` |
| `label`     | `string`  | `''`    | Category label to derive color from                                |
| `showLabel` | `boolean` | `true`  | Whether to show risk text                                          |
| `size`      | `string`  | `'sm'`  | Size: `'xs'`, `'sm'`, `'md'`                                       |
| `className` | `string`  | `''`    | Additional CSS classes                                             |

**Color/Label Mapping:**

| Color    | Risk Label | Example Categories            |
| -------- | ---------- | ----------------------------- |
| `green`  | Trusted    | tools, banks, torah, jewish   |
| `yellow` | Caution    | travel, safe shopping, health |
| `orange` | Risk       | games, shopping, news, media  |
| `red`    | Danger     | social media, mature, proxies |
| `gray`   | Unknown    | (default/unmapped)            |

**Usage:**

```svelte
<!-- With direct colorKey -->
<SafetyBadge colorKey="green" />

<!-- With category label (auto-derives color) -->
<SafetyBadge label="Games" />

<!-- Compact size -->
<SafetyBadge colorKey={category.color} size="xs" />
```

---

### SingleInput

Inline editable field with Edit/Save/Cancel functionality.

**Import:**

```svelte
<script>
	import { SingleInput } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop               | Type       | Default               | Description                             |
| ------------------ | ---------- | --------------------- | --------------------------------------- |
| `label`            | `string`   | `'Field'`             | Field label                             |
| `hideLabel`        | `boolean`  | `false`               | Hide the label text                     |
| `value`            | `string`   | `''`                  | Current value                           |
| `placeholder`      | `string`   | `'Enter value...'`    | Input placeholder                       |
| `rows`             | `number`   | `3`                   | Rows for textarea                       |
| `type`             | `string`   | `'textarea'`          | `'textarea'` or `'text'`                |
| `size`             | `string`   | `'sm'`                | Display text size: `'sm'` or `'lg'`     |
| `showClipboard`    | `boolean`  | `true`                | Show copy-to-clipboard button when value is set |
| `onSave`           | `function` | `async () => {}`      | Async save function, receives new value |
| `onUpdate`         | `function` | `() => {}`            | Callback after successful save          |
| `editTitle`        | `string`   | `'Edit'`              | Tooltip for the edit button             |
| `saveTitle`        | `string`   | `'Save'`              | Tooltip for the save button             |
| `savingTitle`      | `string`   | `'Saving...'`         | Tooltip while save is in progress       |
| `cancelTitle`      | `string`   | `'Cancel'`            | Tooltip for the cancel button           |
| `noChangesMessage` | `string`   | `'No changes to save'`| Toast when save is clicked with no change |
| `emptyMessage`     | `string`   | `''`                  | Empty-state copy (defaults from label)  |
| `disabled`         | `boolean`  | `false`               | Disables edit/save/cancel and the input |

**onSave Contract:**
Must return `{ ok: true }` for success or `{ error: 'message' }` for failure.

**Usage:**

```svelte
<SingleInput
	label="Notes"
	value={device.notes}
	type="textarea"
	rows={3}
	onSave={async (newNotes) => {
		const result = await updateDevice({ notes: newNotes });
		return result;
	}}
	onUpdate={(newNotes) => (device.notes = newNotes)}
/>
```

---

### Skeleton

Loading placeholder with configurable rows and columns.

**Import:**

```svelte
<script>
	import { Skeleton } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type     | Default        | Description                 |
| ----------- | -------- | -------------- | --------------------------- |
| `height`    | `string` | `'h-48'`       | Height class                |
| `width`     | `string` | `''`           | Width class                 |
| `rounded`   | `string` | `'rounded-xl'` | Border radius class         |
| `className` | `string` | `''`           | Additional classes          |
| `rows`      | `array`  | `[]`           | Row definitions (see below) |

**Row Definitions:**

- String: Full-width row with that height, e.g., `'h-6'`
- Object: Grid layout, e.g., `{ columns: 2, height: 'h-4' }`
- Object with column spans: `{ columns: [1, 3], height: 'h-6' }` (1fr and 3fr)

**Usage:**

```svelte
<!-- Simple skeleton -->
<Skeleton height="h-32" />

<!-- Complex skeleton with rows -->
<Skeleton
	rows={[
		'h-6', // Full-width
		{ columns: 2, height: 'h-4' }, // 2-column grid
		'h-4', // Full-width
		{ columns: [1, 3], height: 'h-8' } // 1fr + 3fr columns
	]}
/>
```

---

### Spinner

Loading spinner with LoaderCircle icon.

**Import:**

```svelte
<script>
	import { Spinner } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type     | Default           | Description         |
| ----------- | -------- | ----------------- | ------------------- |
| `size`      | `number` | `32`              | Icon size in pixels |
| `color`     | `string` | `'text-gray-500'` | Color class         |
| `className` | `string` | `''`              | Additional classes  |

**Usage:**

```svelte
<Spinner />

<Spinner size={24} color="text-azure-500" />
```

---

### SvgIcon

Inline SVG icons from `/static/icons` directory.

**Import:**

```svelte
<script>
	import { SvgIcon } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type     | Default     | Description                    |
| ----------- | -------- | ----------- | ------------------------------ |
| `name`      | `string` | -           | Icon filename (without `.svg`), matching `^[a-zA-Z0-9_-]+$` |
| `size`      | `string` | `'w-6 h-6'` | Tailwind size classes          |
| `className` | `string` | `''`        | Additional classes             |

**Usage:**

```svelte
<SvgIcon name="apple-logo" size="w-8 h-8" />

<SvgIcon name="android" className="text-green-500" />
```

**Note:** Icons are fetched from `/icons/{name}.svg` and inherit `currentColor`. The
fetched file content is injected with `{@html}`, so only first-party icons under
`/static/icons` should be served from that path. As a safeguard, `name` is validated
against `^[a-zA-Z0-9_-]+$`; any value containing slashes, dots, or other characters is
rejected (renders the error placeholder) rather than fetched — this prevents path
traversal and keeps the `{@html}` sink from being pointed at an unexpected URL.

---

### TextInput

Styled text input component for text, password, email, textarea, and other text-based inputs.

**Import:**

```svelte
<script>
	import { TextInput } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop             | Type       | Default     | Description                                                                                                |
| ---------------- | ---------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `type`           | `string`   | `'text'`    | Input type: `'text'`, `'password'`, `'email'`, `'tel'`, `'textarea'`, `'number'`, `'datetime-local'`, etc. |
| `value`          | `string`   | `''`        | Input value (bindable)                                                                                     |
| `placeholder`    | `string`   | `''`        | Placeholder text                                                                                           |
| `disabled`       | `boolean`  | `false`     | Disables the input                                                                                         |
| `id`             | `string`   | `''`        | Input ID attribute                                                                                         |
| `name`           | `string`   | `''`        | Input name attribute                                                                                       |
| `ariaLabel`      | `string`   | `''`        | Accessibility label                                                                                        |
| `autocomplete`   | `string`   | `''`        | Autocomplete attribute                                                                                     |
| `required`       | `boolean`  | `false`     | Makes input required                                                                                       |
| `readonly`       | `boolean`  | `false`     | Makes input readonly                                                                                       |
| `maxlength`      | `number`   | `undefined` | Maximum character length                                                                                   |
| `minlength`      | `number`   | `undefined` | Minimum character length                                                                                   |
| `pattern`        | `string`   | `undefined` | Validation pattern                                                                                         |
| `min`            | `number`   | `undefined` | Minimum value (for number/date inputs)                                                                     |
| `max`            | `number`   | `undefined` | Maximum value (for number/date inputs)                                                                     |
| `step`           | `number`   | `undefined` | Step increment (for number inputs)                                                                         |
| `rows`           | `number`   | `4`         | Number of rows (for textarea)                                                                              |
| `size`           | `string`   | `'md'`      | Size variant: `'sm'`, `'md'`, `'lg'`                                                                       |
| `variant`        | `string`   | `'default'` | Style variant: `'default'`, `'error'`, `'success'`                                                         |
| `showSearchIcon` | `boolean`  | `false`     | Show magnifying glass icon on left side                                                                    |
| `className`      | `string`   | `''`        | Additional CSS classes                                                                                     |
| `onchange`       | `function` | `() => {}`  | Change event handler                                                                                       |
| `oninput`        | `function` | `() => {}`  | Input event handler                                                                                        |
| `onkeydown`      | `function` | `() => {}`  | Keydown event handler                                                                                      |
| `onkeypress`     | `function` | `() => {}`  | Keypress event handler                                                                                     |
| `onkeyup`        | `function` | `() => {}`  | Keyup event handler                                                                                        |
| `onfocus`        | `function` | `() => {}`  | Focus event handler                                                                                        |
| `onblur`         | `function` | `() => {}`  | Blur event handler                                                                                         |

**Size Variants:**

| Size | Padding       |
| ---- | ------------- |
| `sm` | `px-2 py-1.5` |
| `md` | `px-3 py-2.5` |
| `lg` | `px-4 py-3`   |

**Style Variants:**

| Variant   | Border Color | Use Case                 |
| --------- | ------------ | ------------------------ |
| `default` | Gray → Azure | Standard input           |
| `error`   | Red          | Validation error state   |
| `success` | Green        | Validation success state |

**Usage:**

```svelte
<script>
	import { TextInput } from '@mbsmart/ui/atoms';
	let username = '';
	let password = '';
	let email = '';
	let notes = '';
	let searchQuery = '';
</script>

<!-- Basic text input -->
<TextInput placeholder="Enter username" bind:value={username} />

<!-- Password with built-in visibility toggle -->
<TextInput type="password" placeholder="Enter password" bind:value={password} />

<!-- Email with validation variant -->
<TextInput
	type="email"
	placeholder="Email address"
	bind:value={email}
	variant={email && !email.includes('@') ? 'error' : 'default'}
/>

<!-- Textarea for multi-line input -->
<TextInput type="textarea" placeholder="Enter notes..." bind:value={notes} rows={4} />

<!-- Search input with magnifying glass icon -->
<TextInput placeholder="Search..." bind:value={searchQuery} showSearchIcon size="sm" />

<!-- Number input with min/max/step -->
<TextInput type="number" min={0} max={100} step={5} bind:value={quantity} />

<!-- Different sizes -->
<TextInput size="sm" placeholder="Small input" />
<TextInput size="md" placeholder="Medium input" />
<TextInput size="lg" placeholder="Large input" />

<!-- With event handlers -->
<TextInput
	placeholder="Press Enter to submit"
	bind:value={searchQuery}
	onkeypress={(e) => e.key === 'Enter' && handleSubmit()}
/>
```

**Password Visibility Toggle:**

When `type="password"`, a built-in eye icon button appears that toggles between showing and hiding the password. This is handled automatically - no additional props needed.

**Search Icon:**

When `showSearchIcon` is true, a magnifying glass icon appears on the left side of the input. The icon color changes to azure on focus.

---

### TextLink

Inline text link/button for secondary actions ("Log in", "Back to login", "Forgot password?"). Renders an `<a>` when `href` is set, otherwise a `<button>` (use `onclick`).

**Import:**

```svelte
<script>
	import { TextLink } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type                  | Default     | Description                                          |
| ----------- | --------------------- | ----------- | ---------------------------------------------------- |
| `href`      | `string`              | `''`        | Link URL. When set, renders an `<a>`.                |
| `onclick`   | `function \| null`    | `null`      | Click handler for button mode.                       |
| `color`     | `'azure' \| 'muted'`  | `'azure'`   | `azure` for accent links, `muted` for subtle grays.  |
| `type`      | `string`              | `'button'`  | Button type (button mode only).                      |
| `disabled`  | `boolean`             | `false`     | Disables the button.                                 |
| `className` | `string`              | `''`        | Extra classes (e.g. `text-sm`, `w-full`).            |

**Usage:**

```svelte
<TextLink onclick={() => goto('/auth/login')}>Log in</TextLink>
<TextLink href="/terms">Terms</TextLink>
<TextLink color="muted" className="text-sm" onclick={goBack}>Back to login</TextLink>
```

---

### Toast

Individual toast notification component (usually used via ToastContainer).

**Import:**

```svelte
<script>
	import { Toast } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop       | Type       | Default     | Description                                         |
| ---------- | ---------- | ----------- | --------------------------------------------------- |
| `message`  | `string`   | `''`        | Toast message                                       |
| `type`     | `string`   | `'success'` | Type: `'success'`, `'error'`, `'info'`, `'warning'` |
| `duration` | `number`   | `3000`      | Auto-dismiss in ms (0 = no auto-dismiss)            |
| `onClose`  | `function` | `() => {}`  | Close callback                                      |

**Type Styling:**

| Type      | Color  | Default Duration |
| --------- | ------ | ---------------- |
| `success` | Green  | 3000ms           |
| `error`   | Red    | 5000ms           |
| `info`    | Blue   | 3000ms           |
| `warning` | Yellow | 4000ms           |

---

### ToggleSwitch

Toggle switch with default and icon variants.

**Import:**

```svelte
<script>
	import { ToggleSwitch } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop          | Type        | Default          | Description                         |
| ------------- | ----------- | ---------------- | ----------------------------------- |
| `label`       | `string`    | `''`             | Used for aria-label                 |
| `customLabel` | `string`    | `null`           | Override aria-label                 |
| `checked`     | `boolean`   | `false`          | Toggle state                        |
| `onChange`    | `function`  | `() => {}`       | Callback with new value             |
| `disabled`    | `boolean`   | `false`          | Disables toggle                     |
| `colorOn`     | `string`    | `'bg-azure-500'` | Background when on                  |
| `colorOff`    | `string`    | `'bg-gray-300'`  | Background when off                 |
| `variant`     | `string`    | `'default'`      | `'default'` or `'icon'`             |
| `iconOn`      | `component` | `null`           | Lucide icon when on (icon variant)  |
| `iconOff`     | `component` | `null`           | Lucide icon when off (icon variant) |
| `iconSize`    | `number`    | `18`             | Icon size (icon variant)            |
| `onText`      | `string`    | `'On'`           | i18n "On" text                      |
| `offText`     | `string`    | `'Off'`          | i18n "Off" text                     |

**Usage:**

```svelte
<!-- Icon variant -->
<script>
	import { Lock, LockOpen } from '@lucide/svelte';
</script>

<!-- Default switch -->
<ToggleSwitch checked={isEnabled} onChange={(val) => (isEnabled = val)} />

<ToggleSwitch
	variant="icon"
	iconOn={Lock}
	iconOff={LockOpen}
	checked={isLocked}
	onChange={(val) => (isLocked = val)}
/>
```

---

### VisibilityToggle

Eye icon button for showing/hiding sensitive content.

**Import:**

```svelte
<script>
	import { VisibilityToggle } from '@mbsmart/ui/atoms';
</script>
```

**Props:**

| Prop        | Type      | Default  | Description                         |
| ----------- | --------- | -------- | ----------------------------------- |
| `visible`   | `boolean` | `false`  | Current visibility state (bindable) |
| `labelShow` | `string`  | `'Show'` | Tooltip when hidden                 |
| `labelHide` | `string`  | `'Hide'` | Tooltip when visible                |

**Usage:**

```svelte
<script>
	let showPassword = false;
</script>

<input type={showPassword ? 'text' : 'password'} />
<VisibilityToggle bind:visible={showPassword} />
```

---

## Molecules

Composite components built from atoms.

### DeviceCard

Device-focused list item built on top of `ListCard`, with plan and payment badges, device metadata, and optional sync and custom action slots.

**Import:**

```svelte
<script>
	import { DeviceCard } from '@mbsmart/ui/molecules';
</script>
```

**Props:**

| Prop                 | Type       | Default        | Description                                                        |
| -------------------- | ---------- | -------------- | ------------------------------------------------------------------ |
| `device`             | `object`   | -              | Device record used to derive labels and metadata                   |
| `href`               | `string`   | `'#'`          | Card link target                                                   |
| `onclick`            | `function` | `null`         | Optional click handler passed to the underlying anchor             |
| `disabled`           | `boolean`  | `false`        | Forces disabled display                                            |
| `disabledTitle`      | `string`   | `''`           | Tooltip text shown when disabled                                   |
| `variant`            | `string`   | `'default'`    | Visual/behavior variant. `'disabled'` also disables the card       |
| `static`             | `boolean`  | `false`        | Renders a non-link row while keeping actions visible               |
| `showArrow`          | `boolean`  | `true`         | Show the trailing chevron on linked cards                          |
| `showOpenInNewTab`   | `boolean`  | `true`         | Show the open-in-new-tab button                                    |
| `openInNewTabHref`   | `string`   | `''`           | Overrides the URL opened by the new-tab button                     |
| `showSyncButton`     | `boolean`  | `false`        | Show the sync action button                                        |
| `showIcon`           | `boolean`  | `true`         | Show the inferred device platform icon                             |
| `showPlanBadge`      | `boolean`  | `true`         | Show the Pro/Basic badge                                           |
| `showPaymentStatus`  | `boolean`  | `true`         | Show the Paid/Unpaid badge when payment status exists              |
| `showDeviceInfo`     | `boolean`  | `true`         | Show the derived device model/info line                            |
| `showLinkcode`       | `boolean`  | `true`         | Show the association/linkcode line derived from `account`          |
| `showNote`           | `boolean`  | `false`        | Show the device note in italic text                                |
| `syncing`            | `boolean`  | `false`        | External loading state for the sync button                         |
| `onSync`             | `function` | `null`         | Async sync handler. Receives the full `device` object              |
| `onSyncStart`        | `function` | `null`         | Called with the derived device id when sync begins                 |
| `onSyncEnd`          | `function` | `null`         | Called with the derived device id when sync finishes               |
| `labels`             | `object`   | `{}`           | Label overrides for built-in copy                                  |
| `actions`            | `snippet`  | -              | Optional trailing actions snippet, rendered before the sync button |

**Recognized device fields:**

- `id` for the secondary identifier line and sync callbacks
- `name` for the main title
- `device_type` or `deviceType` for platform icon selection
- `device_info`, `deviceInfo`, or `deviceModel` for the metadata line
- `is_pro` or `isPro` for the plan badge
- `payment_status` or `paymentStatus` for the payment badge
- `account` for the extra link code line
- `notes` or `note` for the optional note line

**Default labels:**

```javascript
{
	unknownDevice: 'Unknown device',
	pro: 'Pro',
	basic: 'Basic',
	paid: 'Paid',
	unpaid: 'Unpaid',
	syncDevice: 'Sync device',
	notYetSupportedInPortal: 'Not yet supported in portal'
}
```

**Device icons:**

`device_type` values map to these built-in SVG names: `ios` -> `apple-logo`, `android` -> `android-logo`, `mac` -> `mac-logo`, `chrome` -> `chrome-logo`, `windows` -> `windows-logo`. Unknown values fall back to `squircle-dashed`.

**Usage:**

```svelte
<script>
	import { DeviceCard } from '@mbsmart/ui/molecules';

	let device = {
		id: 'A1B2C3',
		name: 'John\'s iPhone',
		device_type: 'ios',
		device_info: 'iPhone 15 Pro',
		is_pro: true,
		payment_status: 'payed',
		account: 'portal--customer-001',
		notes: 'Waiting for next sync'
	};

	async function syncDevice(currentDevice) {
		await refreshDevice(currentDevice.id);
	}
</script>

<DeviceCard
	{device}
	href={`/devices/${device.id}`}
	showNote={true}
	showSyncButton={true}
	onSync={syncDevice}
	labels={{ unpaid: 'Payment due' }}
/>

<!-- Static row with custom actions -->
<DeviceCard
	{device}
	static={true}
	showArrow={false}
	showOpenInNewTab={false}
	actions={() => toolbarSnippet}
/>
```

**Behavior notes:**

- The component derives its disabled state from either `disabled={true}` or `variant="disabled"`.
- The sync button prevents link navigation, manages an internal loading state, and disables itself while syncing.
- The payment badge treats `payment_status === 'payed'` as paid; any other non-empty value is rendered as unpaid.

### Grid

Responsive grid with row-first or column-first flow.

**Import:**

```svelte
<script>
	import { Grid } from '@mbsmart/ui/molecules';
</script>
```

**Props:**

| Prop         | Type      | Default | Description                                  |
| ------------ | --------- | ------- | -------------------------------------------- |
| `flow`       | `string`  | `'row'` | `'row'` (standard) or `'col'` (column-first) |
| `itemCount`  | `number`  | `0`     | Required for `'col'` flow                    |
| `columns`    | `number`  | `1`     | Base column count                            |
| `columnsSm`  | `number`  | `null`  | Columns at 640px+                            |
| `columnsSm2` | `number`  | `null`  | Columns at 700px+                            |
| `columnsMd`  | `number`  | `null`  | Columns at 768px+                            |
| `columnsMd2` | `number`  | `null`  | Columns at 850px+                            |
| `columnsLg`  | `number`  | `null`  | Columns at 1024px+                           |
| `columnsLg2` | `number`  | `null`  | Columns at 1150px+                           |
| `columnsXl`  | `number`  | `null`  | Columns at 1280px+                           |
| `columnsXl2` | `number`  | `null`  | Columns at 1440px+                           |
| `columns2Xl` | `number`  | `null`  | Columns at 1536px+                           |
| `columns2Xl2` | `number` | `null`  | Columns at 1650px+                           |
| `gapX`       | `number`  | `2`     | Horizontal gap in rem                        |
| `gapY`       | `number`  | `0`     | Vertical gap in rem                          |
| `disabled`   | `boolean` | `false` | Disable grid (normal flow)                   |
| `className`  | `string`  | `''`    | Additional classes                           |
| `children`   | `snippet` | -       | Grid content                                 |

**Usage:**

```svelte
<!-- Responsive grid -->
<Grid columns={1} columnsSm={2} columnsLg={3} gapX={1} gapY={1}>
	{#each items as item}
		<div>{item.name}</div>
	{/each}
</Grid>

<!-- Column-first flow (fills top-to-bottom first) -->
<Grid flow="col" itemCount={items.length} columns={2}>
	{#each items as item}
		<div>{item.name}</div>
	{/each}
</Grid>
```

---

### Island

Collapsible card container with optional title and icon.

**Import:**

```svelte
<script>
	import { Island } from '@mbsmart/ui/molecules';
</script>
```

**Props:**

| Prop              | Type        | Default | Description                      |
| ----------------- | ----------- | ------- | -------------------------------- |
| `title`           | `string`    | `''`    | Header title                     |
| `icon`            | `component` | `null`  | Lucide icon component            |
| `svgIcon`         | `string`    | `''`    | SVG icon name from /static/icons |
| `defaultExpanded` | `boolean`   | `true`  | Initial expanded state           |
| `forceExpanded`   | `boolean`   | `false` | Always expanded, no toggle       |
| `collapsible`     | `boolean`   | `true`  | Enable collapse functionality    |
| `className`       | `string`    | `''`    | Additional classes               |
| `children`        | `snippet`   | -       | Island content                   |

**Usage:**

```svelte
<script>
	import { User } from '@lucide/svelte';
</script>

<!-- Collapsible with icon -->
<Island title="User Information" icon={User}>
	<p>Content here...</p>
</Island>

<!-- Non-collapsible -->
<Island title="Settings" collapsible={false}>
	<p>Always visible content</p>
</Island>

<!-- Plain container (no header) -->
<Island>
	<p>Simple card</p>
</Island>

<!-- With custom SVG icon -->
<Island title="Device" svgIcon="apple-logo">
	<p>Device content</p>
</Island>
```

---

### ListCard

Reusable list-row primitive for linked, static, or disabled cards with optional icon, actions, trailing arrow, and open-in-new-tab button.

**Import:**

```svelte
<script>
	import { ListCard } from '@mbsmart/ui/molecules';
</script>
```

**Props:**

| Prop               | Type       | Default   | Description                                                    |
| ------------------ | ---------- | --------- | -------------------------------------------------------------- |
| `href`             | `string`   | `'#'`     | Link destination when the card is interactive                  |
| `onclick`          | `function` | `null`    | Optional click handler for the interactive anchor              |
| `disabled`         | `boolean`  | `false`   | Render a muted, non-interactive row                            |
| `disabledTitle`    | `string`   | `''`      | Tooltip shown on disabled rows                                 |
| `static`           | `boolean`  | `false`   | Render a non-link row while keeping actions visible            |
| `showArrow`        | `boolean`  | `true`    | Show the trailing chevron on interactive rows                  |
| `showOpenInNewTab` | `boolean`  | `true`    | Show the open-in-new-tab button on static and interactive rows |
| `openInNewTabHref` | `string`   | `''`      | Optional override for the URL opened in a new tab              |
| `icon`             | `snippet`  | -         | Leading visual snippet                                         |
| `actions`          | `snippet`  | -         | Trailing action snippet                                        |
| `children`         | `snippet`  | -         | Main row content                                               |

**Render modes:**

- `disabled={true}` renders a `<div>` with reduced opacity and no actions or new-tab button.
- `static={true}` renders a non-link `<div>` with optional actions and new-tab button.
- The default mode renders an `<a>` with hover styles, optional actions, new-tab button, and optional chevron.

**Usage:**

```svelte
<script>
	import { ListCard } from '@mbsmart/ui/molecules';
	import { Badge } from '@mbsmart/ui/atoms';
</script>

<ListCard href="/devices/A1B2C3">
	{#snippet icon()}
		<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
			D
		</div>
	{/snippet}

	{#snippet children()}
		<p class="font-medium text-gray-900">Device A1B2C3</p>
		<p class="text-sm text-gray-500">Last synced 2 minutes ago</p>
	{/snippet}

	{#snippet actions()}
		<Badge color="green" size="tiny">Active</Badge>
	{/snippet}
</ListCard>

<!-- Disabled row -->
<ListCard disabled={true} disabledTitle="Not available in this portal">
	{#snippet children()}
		<p class="font-medium text-gray-900">Unavailable device</p>
	{/snippet}
</ListCard>
```

**Behavior notes:**

- The new-tab button calls `window.open(resolvedUrl, '_blank')` and stops the row click from firing.
- `openInNewTabHref` falls back to `href` when not provided.
- Interactive rows include `data-sveltekit-reload={true}` on the anchor.

---

### MultiInput

Multi-field form with Edit/Save/Cancel and change tracking.

**Import:**

```svelte
<script>
	import { MultiInput } from '@mbsmart/ui/molecules';
</script>
```

**Props:**

| Prop          | Type       | Default          | Description                    |
| ------------- | ---------- | ---------------- | ------------------------------ |
| `fields`      | `array`    | `[]`             | Field configuration array      |
| `initialData` | `object`   | `{}`             | Initial values object          |
| `onSave`      | `function` | `async () => {}` | Async save function            |
| `onUpdate`    | `function` | `() => {}`       | Callback after successful save |

**Field Configuration:**

```javascript
{
  key: 'fieldName',        // Object key
  label: 'Field Label',    // Display label
  type: 'text',            // Input type (text, email, tel, textarea, etc.)
  placeholder: 'Enter...', // Placeholder text
  fullWidth: false,        // Span 2 columns
  rows: 4,                 // For textarea
  hidden: false            // Show masked with visibility toggle
}
```

**onSave Contract:**

- Receives an object with **only changed fields**
- Must return `{ ok: true }` or `{ error: 'message' }`

**Usage:**

```svelte
<script>
	const fields = [
		{ key: 'name', label: 'Name', type: 'text' },
		{ key: 'email', label: 'Email', type: 'email' },
		{ key: 'pin', label: 'PIN', type: 'text', hidden: true },
		{ key: 'notes', label: 'Notes', type: 'textarea', fullWidth: true, rows: 4 }
	];

	const initialData = {
		name: device.name || '',
		email: device.email || '',
		pin: device.pin || '',
		notes: device.notes || ''
	};
</script>

<MultiInput
	{fields}
	{initialData}
	onSave={async (changedFields) => {
		return await updateDevice(changedFields);
	}}
	onUpdate={(newData) => (device = { ...device, ...newData })}
/>
```

---

### NamedControl

Label wrapper for form controls with optional description and info tooltip.

**Import:**

```svelte
<script>
	import { NamedControl } from '@mbsmart/ui/molecules';
</script>
```

**Props:**

| Prop            | Type      | Default     | Description                  |
| --------------- | --------- | ----------- | ---------------------------- |
| `label`         | `string`  | `''`        | Main label text              |
| `description`   | `string`  | `''`        | Description text below label |
| `info`          | `boolean` | `false`     | Show info tooltip            |
| `infoLabel`     | `string`  | `''`        | Custom label for info lookup |
| `infoDirectory` | `any`     | `null`      | Custom info directory for i18n |
| `prefix`        | `snippet` | `undefined` | Optional content before label |
| `children`      | `snippet` | `undefined` | Control to render            |

**Usage:**

```svelte
<NamedControl label="Enable Feature" description="Turns on the feature">
  <ToggleSwitch checked={enabled} onChange={(v) => enabled = v} />
</NamedControl>

<!-- With info tooltip -->
<NamedControl label="Device Protection" info={true}>
  <ToggleSwitch checked={protected} onChange={handleProtectionChange} />
</NamedControl>
```

---

### Tabs

Horizontal tab strip with an active underline and optional per-tab icons. Wraps
onto additional rows when there isn't enough horizontal room, so it degrades
gracefully on narrow / mobile screens.

**Import:**

```svelte
<script>
	import { Tabs } from '@mbsmart/ui/molecules';
</script>
```

**Props:**

| Prop       | Type       | Default | Description                                                        |
| ---------- | ---------- | ------- | ------------------------------------------------------------------ |
| `tabs`     | `Array`    | `[]`    | Tabs to render: `{ id, label, icon? }`. `icon` is a Lucide component |
| `active`   | `string`   | -       | Active tab id. Bindable (`bind:active`)                            |
| `onChange` | `function` | `()=>{}`| Called with the selected tab id                                   |

**Usage:**

```svelte
<script>
	import { Tabs } from '@mbsmart/ui/molecules';
	import { KeyRound, UserPen } from '@lucide/svelte';

	let active = $state('account');
	const tabs = [
		{ id: 'account', label: 'Account', icon: UserPen },
		{ id: 'password', label: 'Password', icon: KeyRound }
	];
</script>

<Tabs {tabs} bind:active />

{#if active === 'account'}
	<!-- account panel -->
{/if}
```

---

## Organisms

Complex components with significant functionality.

### Modal

Full-screen modal overlay with backdrop.

**Import:**

```svelte
<script>
	import { Modal } from '@mbsmart/ui/organisms';
</script>
```

**Props:**

| Prop              | Type                         | Default    | Description                  |
| ----------------- | ---------------------------- | ---------- | ---------------------------- |
| `isOpen`          | `boolean`                    | `false`    | Controls visibility          |
| `onClose`         | `function`                   | `() => {}` | Close callback               |
| `showCloseButton` | `boolean`                    | `true`     | Show X button                |
| `closeOnBackdrop` | `boolean`                    | `true`     | Close when clicking backdrop |
| `closeOnEscape`   | `boolean`                    | `true`     | Close on ESC key             |
| `verticalAlign`   | `'top' \| 'center' \| 'bottom'` | `'center'` | Vertical placement of the modal |
| `overflowVisible` | `boolean`                    | `false`    | When true, content uses `overflow-visible` so absolutely-positioned dropdowns are not clipped |
| `children`        | `snippet`                    | -          | Modal content                |

**Usage:**

```svelte
<script>
	let isOpen = false;
</script>

<button onclick={() => (isOpen = true)}>Open Modal</button>

<Modal {isOpen} onClose={() => (isOpen = false)}>
	<Island title="Modal Title">
		<p>Modal content here</p>
		<ControlButton onclick={() => (isOpen = false)}>Close</ControlButton>
	</Island>
</Modal>

<!-- Dropdowns that escape the modal box -->
<Modal {isOpen} onClose={() => (isOpen = false)} overflowVisible>
	<!-- custom select / absolute menus -->
</Modal>
```

---

### QuickLinks

Grid of quick link cards with icons.

**Import:**

```svelte
<script>
	import { QuickLinks } from '@mbsmart/ui/organisms';
</script>
```

**Props:**

| Prop          | Type     | Default                           | Description         |
| ------------- | -------- | --------------------------------- | ------------------- |
| `gridClasses` | `string` | `'sm:grid-cols-2 lg:grid-cols-3'` | Grid column classes |

**Usage:**

```svelte
<QuickLinks />

<QuickLinks gridClasses="sm:grid-cols-1 lg:grid-cols-2" />
```

**Built-in Links:**

- Wiki Docs
- Training by MB
- Training by TAG
- 2-Factor Authentication
- Downloads
- Old Portal

---

### SearchableList

Searchable, filterable list with optional bulk selection.

**Import:**

```svelte
<script>
	import { SearchableList } from '@mbsmart/ui/organisms';
</script>
```

**Props:**

| Prop                | Type      | Default            | Description                      |
| ------------------- | --------- | ------------------ | -------------------------------- |
| `title`             | `string`  | `'Items'`          | List title                       |
| `items`             | `array`   | `[]`               | Array of items                   |
| `searchKeys`        | `array`   | `[]`               | Object paths to search in        |
| `searchPlaceholder` | `string`  | `'Search...'`      | Placeholder text                 |
| `searchThreshold`   | `number`  | `0`                | Hide search input until `items.length` reaches this count (`0` = always show) |
| `specialFilters`    | `object`  | `{}`               | Special keyword filters          |
| `emptyMessage`      | `string`  | `'No items found'` | Empty state message              |
| `itemName`          | `string`  | `'item'`           | Singular item name               |
| `filterTabs`        | `array`   | `[]`               | Tab filter definitions           |
| `columns`           | `number`  | `1`                | Grid columns                     |
| `columnsXl`         | `number`  | `1`                | Columns at xl breakpoint         |
| `columnsXl2`        | `number`  | `1`                | Columns at xl2 breakpoint        |
| `columns2Xl`        | `number`  | `2`                | Columns at 2xl breakpoint        |
| `disableGrid`       | `boolean` | `false`            | Use normal flow                  |
| `searchActions`     | `snippet` | `undefined`        | Optional actions next to search  |
| `children`          | `snippet` | -                  | Item render function             |
| `bulk`              | `boolean` | `false`            | Enable bulk selection            |
| `selected`          | `array`   | `[]`               | Selected item IDs (bindable)     |
| `selectedItems`     | `array`   | `[]`               | Selected item objects (bindable) |
| `selectId`          | `string`  | `'id'`             | Path to item ID                  |
| `idKey`             | `string`  | `null`             | Key for #each block              |
| `pageSize`          | `number`  | `28`               | Items per page (0 = no pagination) |
| `externalQuery`     | `string`  | `''`               | Supplied search query from outside |
| `ofText`            | `string`  | `'of'`             | i18n "of" text                   |
| `selectedText`      | `string`  | `'selected'`       | i18n "selected" text             |
| `pageText`          | `string`  | `'Page'`           | i18n "Page" label                |
| `prevText`          | `string`  | `'Previous'`       | i18n aria-label for prev button  |
| `nextText`          | `string`  | `'Next'`           | i18n aria-label for next button  |
| `showAllText`       | `string`  | `'Show all'`       | i18n label for the "show all" link that bypasses pagination |
| `paginateText`      | `string`  | `'Paginate'`       | i18n label for the button that returns to paginated view when all items are shown |
| `formatAllCount`    | `function`| `null`             | Optional `(count) => string \| null`, called with the total item count. Only applies while every item is visible (nothing hidden by search, tabs, or pagination); a non-empty string then becomes the entire count line. Return null/undefined/'' to keep the default forms. |
| `showResultsCount`  | `boolean` | `true`             | When `false`, the built-in results count line is omitted (parent can render its own). |

**Results count behavior:**

- The count line shows the `X of Y` form (e.g. `10 of 42 Devices`) only while the current page hides some of the filtered results.
- When every filtered item fits on the current page, the `of` clause is dropped and it reads `Y Devices` (e.g. `1 Device`), since `1 of 1` carries no extra information.
- Pass `formatAllCount` to replace the whole count line with a custom phrase (e.g. `"You have {count} devices"`). It only kicks in while the full list is on screen at a glance; once search, tabs, or pagination hide items, the default forms above take over.
- Pass `showResultsCount={false}` when the parent owns the count line entirely.

**Show-all behavior:**

- The pagination controls include a `Show all` link (controlled by `showAllText`) that, when clicked, bypasses pagination and displays all currently filtered items.
- While showing all items the pagination controls collapse to a single button labeled by `paginateText` which returns the list to the paginated view.
- The `showAll` state resets to `false` whenever the search query or active filter changes, so pagination is the default on navigation/hydration.

**filterTabs Format:**

```javascript
[
	{ key: 'all', label: 'All', filterFn: () => true },
	{ key: 'active', label: 'Active', filterFn: (item) => item.active }
];
```

**specialFilters Format:**

```javascript
{
  'open': { path: 'status', value: 'open' },
  'closed': { path: 'status', value: 'closed' }
}
```

**Usage:**

```svelte
<SearchableList
	items={apps}
	searchKeys={['name', 'package']}
	searchPlaceholder="Search apps..."
	itemName="app"
	filterTabs={[
		{ key: 'all', label: 'All', filterFn: () => true },
		{ key: 'blocked', label: 'Blocked', filterFn: (app) => app.status === 'blocked' }
	]}
	specialFilters={{
		open: { path: 'request_status', value: 'open' }
	}}
>
	{#snippet children(app, activeFilter)}
		<div class="rounded border p-2">
			{app.name}
		</div>
	{/snippet}
</SearchableList>

<!-- With bulk selection -->
<SearchableList
	{items}
	searchKeys={['name']}
	bulk={true}
	bind:selected={selectedIds}
	bind:selectedItems={selectedObjects}
>
	{#snippet children(item)}
		<span>{item.name}</span>
	{/snippet}
</SearchableList>
```

**With pagination:**

```svelte
<SearchableList
	{items}
	searchKeys={['name']}
	itemName="item"
	pageSize={20}
>
	{#snippet children(item)}
		<span>{item.name}</span>
	{/snippet}
</SearchableList>
```

**Magic Search Integration:**

Pass `ctx.magicSearchQuery` as `externalQuery` to let SectionedPage's magic search drive the list's filtering. It feeds into the same search pipeline as the built-in search bar (which is automatically hidden by magic search CSS). Pagination, tab filters, and special filters all continue to work normally.

```svelte
{#snippet sectionContent(ctx)}
	<SearchableList
		{items}
		searchKeys={['name', 'package']}
		externalQuery={ctx.magicSearchQuery}
	>
		{#snippet children(item)}
			<span>{item.name}</span>
		{/snippet}
	</SearchableList>
{/snippet}
```

---

### ToastContainer

Container component for displaying toast notifications.

**Import:**

```svelte
<script>
	import { ToastContainer } from '@mbsmart/ui/organisms';
</script>
```

**Usage:**

Add once in your root layout:

```svelte
<!-- +layout.svelte -->
<script>
	import { ToastContainer } from '@mbsmart/ui/organisms';
</script>

<ToastContainer />
{@render children()}
```

Then use the `toast` utility anywhere:

```svelte
<script>
	import { toast } from '@mbsmart/ui/utils';

	function handleSave() {
		toast.success('Saved successfully!');
	}
</script>
```

---

## Templates

Full page layout components.

### ErrorPage

Full-screen error page template with status code, message, bundled light/dark images, and a customisable action button via a snippet. Default images are included in the library; override with your own via `darkImage` / `lightImage` props.

**Import:**

```svelte
<script>
	import { ErrorPage } from '@mbsmart/ui/templates';
</script>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `statusCode` | `number` | `404` | HTTP status code displayed as a heading |
| `message` | `string` | `''` | Error message shown below the status code |
| `darkImage` | `string` | bundled image | Image path/URL shown in dark mode |
| `lightImage` | `string` | bundled image | Image path/URL shown in light mode |
| `imageAlt` | `string` | `''` | Alt text for the images |

**Snippets:**

| Snippet | Description |
|---------|-------------|
| `action` | Custom action button (e.g. "Back to Dashboard") |

**Usage:**

```svelte
<!-- Minimal — uses bundled images -->
<ErrorPage statusCode={404} message="Page not found">
	{#snippet action()}
		<ControlButton onclick={goHome} color="azure" size="lg">
			Back to Dashboard
		</ControlButton>
	{/snippet}
</ErrorPage>

<!-- Custom images -->
<ErrorPage
	statusCode={500}
	message="Something went wrong"
	darkImage="/my-dark-error.png"
	lightImage="/my-light-error.png"
>
	{#snippet action()}
		<a href="/">Go home</a>
	{/snippet}
</ErrorPage>
```

---

### SectionedPage

Complex page template with sidebar navigation, magic search, and section content.

**Import:**

```svelte
<script>
	import { SectionedPage } from '@mbsmart/ui/templates';
</script>
```

---

### AppShell

Full page layout template with sticky header, loading progress bar, and main content area. Provides the complete shell for dashboard and app layouts.

**Import:**

```svelte
<script>
	import { AppShell } from '@mbsmart/ui/templates';
	import { NavButton } from '@mbsmart/ui/atoms';
	import { LogOut, Settings, UserRoundPlus } from '@lucide/svelte';
</script>
```

**Props:**

| Prop              | Type    | Default        | Description                               |
| ----------------- | ------- | -------------- | ----------------------------------------- |
| `title`           | string  | `''`           | Main title (e.g. userId, page name)       |
| `versionString`   | string  | `''`           | Version badge (e.g. `VERSION_STRING`)     |
| `logoIcon`        | string  | `mbsmart-logo` | Custom logo icon name for SvgIcon         |
| `logoHref`        | string  | `/dashboard`   | Logo, title, and version link destination |
| `loadingProgress` | number  | `0`            | Loading bar progress percentage (0-100)   |
| `isFullyLoaded`   | boolean | `true`         | When true, hides the loading bar          |
| `className`       | string  | `''`           | Additional CSS classes for wrapper        |
| `headerContent`   | snippet | -              | Content for header area (search, buttons) |
| `children`        | snippet | -              | Main page content                         |

**Usage:**

```svelte
<AppShell title={userId} versionString={VERSION_STRING} loadingProgress={75} isFullyLoaded={false}>
	{#snippet headerContent()}
		<!-- Search input -->
		<input type="text" placeholder="Search..." class="..." />

		<!-- Nav buttons -->
		<NavButton href="/dashboard/device/new" icon={UserRoundPlus} label="New Device" color="azure" />
		<NavButton href="/dashboard/settings" icon={Settings} label="Settings" color="azure" />
		<NavButton onclick={logout} icon={LogOut} label="Logout" color="red" />
	{/snippet}

	<!-- Main page content -->
	<div class="p-4">
		<h1>Dashboard</h1>
	</div>
</AppShell>
```

**Features:**

- Full page layout with `min-h-screen` and neutral background
- Sticky header (`sticky top-0 z-40`) with shadow
- Built-in MB logo and title display (one clickable unit with shared hover)
- Version badge (right of title; included in the logo/title link)
- Loading progress bar below header (sticky, animates)
- Main content area with proper padding for mobile nav
- Responsive and accessible

**Loading Bar:**

The loading bar appears below the header and shows progress:

```svelte
<AppShell loadingProgress={loadingPercent} isFullyLoaded={loadingPercent >= 100}>...</AppShell>
```

**Notes:**

- Use `headerContent` snippet for header actions (search, NavButtons)
- Use `children` for main page content
- Logo defaults to MB logo, can be overridden with `logoIcon` prop
- Logo, title, and version share one `logoHref` link with coordinated hover colors
- Loading bar automatically hides when `isFullyLoaded` is true

---

**Props:**

| Prop              | Type       | Default    | Description                  |
| ----------------- | ---------- | ---------- | ---------------------------- |
| `sections`        | `array`    | `[]`       | Section definitions          |
| `navActions`      | `array`    | `[]`       | Navigation action buttons    |
| `loading`         | `boolean`  | `false`    | Show loading state           |
| `error`           | `string`   | `''`       | Error message                |
| `onRetry`         | `function` | `() => {}` | Retry button handler         |
| `overflowMenuTitle` | `string` | `'More'` | Title for the mobile overflow menu |
| `defaultIslandsExpanded` | `boolean` | `true` | Initial expanded state for all Islands rendered via `ctx.islandProps`. Captured on mount; users can still toggle expand/collapse all afterwards. |
| `hotkeysEnabled`  | `boolean`  | `true`     | Master switch for the keyboard shortcuts (`Alt+Shift+M`, `Alt+Shift+{letter}` section nav, double-tap `CC`) and their `Kbd` hint badges. Set `false` to disable all shortcuts and hide the hints — magic search still works by clicking/typing into the input, and per-section `shortcut` badges are suppressed. |
| `magicSearchEnabled` | `boolean` | `true`  | Master switch for magic search. Set `false` to hide the search input, its `Kbd`/clear hints and the no-results message, and to stop bare-key typing and `Alt+Shift+M` from feeding the search. Section tabs and the collapse/expand-all control stay, and the collapse control right-aligns in place of the input. Independent of `hotkeysEnabled` (double-tap `CC` still toggles all islands). |
| `collapseAllEnabled` | `boolean` | `true`  | Master switch for the collapse/expand-all control. Set `false` to hide the collapse-all button and stop the double-tap `CC` hotkey from toggling all islands. Individual islands still collapse via their own headers. |
| `header`          | `snippet`  | -          | Header content               |
| `sidebarSkeleton` | `snippet`  | -          | Loading skeleton for sidebar |
| `mainSkeleton`    | `snippet`  | -          | Loading skeleton for main    |
| `sectionContent`  | `snippet`  | -          | Section content renderer     |

**Section Definition:**

```javascript
{
  key: 'info',          // Unique key (used in URL hash)
  name: 'Information',  // Display name
  icon: User,           // Lucide icon component
  svgIcon: 'custom',    // OR custom SVG icon name
  shortcut: 'I',        // Alt+Shift+{key} shortcut
  advanced: false,      // Show "advanced" label
  unimportant: false    // When true, hidden from mobile bottom bar and tucked into overflow menu
}
```

**navActions Definition:**

```javascript
{
  label: 'Action Name',
  title: 'Tooltip text',
  icon: Star,           // Lucide icon
  onclick: () => {}     // Click handler
}
```

**sectionContent Context:**
The `sectionContent` snippet receives a context object with:

```javascript
{
  activeSection,        // Current section key
  magicSearchActive,    // Boolean: is magic search active
  magicSearchQuery,     // Current search query
  allIslandsExpanded,   // Boolean: default island state
  islandResetKey,       // Key to force island re-render

  // Helper functions:
  isVisible(sectionKey),           // Returns true if section should show
  isVisibleMulti(...sectionKeys),  // Returns true if any key matches

  // Props for Island components:
  islandProps: { defaultExpanded, forceExpanded }
}
```

**Keyboard Shortcuts:** (all gated behind `hotkeysEnabled`, which defaults to `true`)

- `Alt+Shift+{letter}`: Navigate to section
- `Alt+Shift+M`: Focus magic search
- `CC` (double-tap C): Toggle expand/collapse all (only when `collapseAllEnabled`)
- `ESC`: Clear magic search (when focused — always available, independent of `hotkeysEnabled`)

Pass `hotkeysEnabled={false}` to disable all of the above and hide their `Kbd` hint badges. Magic search remains fully usable via clicking or typing into the search input; only the shortcut affordances are removed.

**Disabling magic search:** Pass `magicSearchEnabled={false}` to remove the search entirely — the input, its hints, and the no-results message are hidden, and typing (bare keys / `Alt+Shift+M`) no longer feeds the search. The section tabs and the collapse/expand-all control remain fully functional. The magic-search text props (`magicSearchPlaceholder`, `magicSearchNoResultsPrefix`, `magicSearchNoResultsSuffix`, `disabledDuringSearchTitle`) become unused and can be omitted.

**Disabling collapse-all:** Pass `collapseAllEnabled={false}` to remove the collapse/expand-all button and disable the double-tap `CC` hotkey. Individual islands still collapse via their own headers, and the `collapseAllSectionsTitle`/`expandAllSectionsTitle` props become unused and can be omitted.

**Usage:**

```svelte
<script>
	import { SectionedPage } from '@mbsmart/ui/templates';
	import { Island } from '@mbsmart/ui/molecules';
	import { User, Settings, Star } from '@lucide/svelte';

	const sections = [
		{ key: 'info', name: 'Information', icon: User, shortcut: 'I' },
		{ key: 'settings', name: 'Settings', icon: Settings, shortcut: 'S' },
		{ key: 'advanced', name: 'Advanced', icon: Star, shortcut: 'A', unimportant: true }
	];

	const navActions = [{ label: 'Presets', icon: Star, onclick: openPresets }];
</script>

<SectionedPage {sections} {navActions} loading={isLoading} error={errorMessage} onRetry={loadData}>
	{#snippet header()}
		<h1>Page Title</h1>
	{/snippet}

	{#snippet sidebarSkeleton()}
		<Skeleton height="h-48" />
	{/snippet}

	{#snippet mainSkeleton()}
		<Skeleton rows={['h-8', 'h-32', 'h-32']} />
	{/snippet}

	{#snippet sectionContent(ctx)}
		<!-- Use ctx.isVisible() to show/hide sections -->
		{#if ctx.isVisible('info')}
			<Island title="User Info" {...ctx.islandProps}>
				<p>Info content</p>
			</Island>
		{/if}

		{#if ctx.isVisible('settings')}
			<Island title="Settings" {...ctx.islandProps}>
				<p>Settings content</p>
			</Island>
		{/if}
	{/snippet}
</SectionedPage>
```

**Magic Search:**
The template includes a "magic search" that searches across all elements with `data-magicsearch` attributes:

```svelte
<!-- Elements will be filtered by magic search -->
<div data-magicsearch="user info name email" class="magicsearch-item">Content here</div>

<!-- Islands should have magicsearch-island class -->
<div data-magicsearch="settings preferences" class="magicsearch-island">
	<Island title="Settings">...</Island>
</div>
```

**Mobile Overflow Menu:**

On small screens (`< sm:`), the bottom navigation bar only shows "important" section tabs (those without `unimportant: true`). Section names appear under each icon (in normal document flow so they reserve height and are not clipped), with the active section name bolded. The same under-icon labels appear in the narrow `sm`–`lg` sidebar until the full inline label shows at `lg+`.

An ellipsis (`...`) button appears at the end of the bottom bar when there are overflow items. Tapping it opens a bottom-sheet Modal listing:
- **Unimportant sections** — section tabs marked with `unimportant: true`
- **Nav actions** — all `navActions` buttons (these are always hidden from the mobile bottom bar)

On `sm:` and above, the sidebar shows all sections and nav actions as normal — the overflow menu is mobile-only.

---

## Utilities

Helper functions and stores.

### categoryColors

Category-to-color mapping utilities for risk level display.

**Import:**

```javascript
import {
	deriveColorKeyFromLabel,
	getRiskLabel,
	getColorClasses,
	normalizeLabel,
	labelToColorKey,
	riskLabelMap,
	colorClasses
} from '@mbsmart/ui/utils';
```

**Functions:**

#### `deriveColorKeyFromLabel(label)`

Derives a color key from a category label.

```javascript
deriveColorKeyFromLabel('Games'); // 'orange'
deriveColorKeyFromLabel('Banks'); // 'green'
deriveColorKeyFromLabel('Unknown'); // 'gray'
```

#### `getRiskLabel(colorKey)`

Gets the risk label for a color key.

```javascript
getRiskLabel('green'); // 'Trusted'
getRiskLabel('yellow'); // 'Caution'
getRiskLabel('orange'); // 'Risk'
getRiskLabel('red'); // 'Danger'
getRiskLabel('gray'); // 'Unknown'
```

#### `getColorClasses(colorKey)`

Gets TailwindCSS classes for a color key.

```javascript
getColorClasses('green');
// 'border-green-alt-500 bg-green-alt-500/5 text-green-alt-500'
```

#### `normalizeLabel(label)`

Normalizes category labels for display (handles API quirks).

```javascript
normalizeLabel('socialmedia'); // 'Social Media'
```

**Color Mappings:**

| Category                                          | Color Key |
| ------------------------------------------------- | --------- |
| tools, banks, torah, jewish, technology, business | green     |
| travel, safe shopping, information, health, jobs  | yellow    |
| games, shopping, news, media, browsers            | orange    |
| social media, mature, proxies, entertainment      | red       |

---

### dateTime

Date formatting and relative time utilities.

**Import:**

```javascript
import {
	parseDate,
	isZeroDate,
	formatDate,
	formatDateTime,
	formatDateShort,
	getRelativeTime,
	getTimeElapsed,
	formatBillingDate
} from '@mbsmart/ui/utils';
```

**Functions:**

#### `parseDate(dateStr)`

Parses date strings in various formats.

```javascript
parseDate('2026-01-22 14:30:00'); // Date object
parseDate('2026-01-22T14:30:00'); // Date object
parseDate('invalid'); // null
```

#### `isZeroDate(dateStr)`

Checks if a date is a "zero" placeholder.

```javascript
isZeroDate('0000-00-00 00:00:00'); // true
isZeroDate('2026-01-22'); // false
```

#### `formatDate(dateStr, options?)`

Formats a date for display.

```javascript
formatDate('2026-01-22'); // 'January 22, 2026'
formatDate('2026-01-22', { month: 'short' }); // 'Jan 22, 2026'
```

#### `formatDateTime(dateStr)`

Formats date with time.

```javascript
formatDateTime('2026-01-22 14:30:00'); // 'January 22, 2026, 2:30 PM'
```

#### `formatDateShort(dateStr)`

Short date format.

```javascript
formatDateShort('2026-01-22'); // 'Jan 22, 2026'
```

#### `getRelativeTime(dateStr)`

Gets relative time string.

```javascript
getRelativeTime(futureDate); // 'in 3 days'
getRelativeTime(pastDate); // '2 weeks ago'
```

#### `getTimeElapsed(dateStr)`

Gets elapsed time (always past tense, more granular).

```javascript
getTimeElapsed(recentDate); // '5 minutes ago'
getTimeElapsed(oldDate); // '3 months ago'
```

---

### labels

API label to human-readable text conversions.

**Import:**

```javascript
import {
	formatKeyAsLabel,
	getRestrictionLabel,
	getTextFilteringLabel,
	getYoutubeRequestLabel,
	isYoutubeCategory,
	getYoutubeColorKey,
	getFeatureGroupLabel,
	getSettingsGroupLabel,
	getSettingKeyLabel,
	getExtrasLabel,
	labelMaps
} from '@mbsmart/ui/utils';
```

**Functions:**

#### `formatKeyAsLabel(key)`

Converts snake_case/camelCase to Title Case.

```javascript
formatKeyAsLabel('some_api_key'); // 'Some Api Key'
formatKeyAsLabel('camelCase'); // 'Camel Case'
```

#### `getRestrictionLabel(key)`

Gets label for Apple restriction keys.

```javascript
getRestrictionLabel('ios_restrictions_apps_allow_imessage'); // 'Allow iMessage'
```

#### `getTextFilteringLabel(category)`

Gets label for text filtering categories.

```javascript
getTextFilteringLabel('Swimsuite'); // 'Swimwear' (fixes typo)
```

#### `getYoutubeRequestLabel(categoryId)`

Gets label for YouTube categories.

```javascript
getYoutubeRequestLabel('YT_Gamming'); // 'Gaming' (fixes typo)
```

#### `isYoutubeCategory(categoryId)`

Checks if a category is a YouTube category.

```javascript
isYoutubeCategory('YT_Music'); // true
isYoutubeCategory('Games'); // false
```

#### `getYoutubeColorKey(categoryId)`

Gets color key for YouTube categories.

```javascript
getYoutubeColorKey('YT_Education'); // 'green'
getYoutubeColorKey('YT_Entertainment'); // 'red'
```

#### `getFeatureGroupLabel(featureName)`

Gets label for feature groups.

```javascript
getFeatureGroupLabel('in-app-browser'); // 'In-App Browsers'
```

#### `getSettingsGroupLabel(groupName)`

Gets label for settings groups.

```javascript
getSettingsGroupLabel('account_security'); // 'Account Security'
```

#### `getSettingKeyLabel(settingKey)`

Gets label for setting keys.

```javascript
getSettingKeyLabel('global_system_filter_on'); // 'Filter Enabled'
```

---

### stringUtils

String manipulation and fuzzy matching.

**Import:**

```javascript
import { levenshteinDistance, fuzzyMatch, fuzzyIncludes } from '@mbsmart/ui/utils';
```

**Functions:**

#### `levenshteinDistance(a, b)`

Calculates edit distance between two strings.

```javascript
levenshteinDistance('hello', 'hallo'); // 1
levenshteinDistance('test', 'test'); // 0
```

#### `fuzzyMatch(query, target, maxDistance?)`

Checks if query fuzzy-matches target within tolerance.

```javascript
fuzzyMatch('gams', 'games', 1); // true (1 typo)
fuzzyMatch('gmas', 'games', 1); // true (1 typo)
fuzzyMatch('gmeas', 'games', 1); // false (2 typos)
fuzzyMatch('gam', 'games'); // true (substring)
```

#### `fuzzyIncludes(query, target, typoTolerance?)`

Alias for `fuzzyMatch` with default tolerance of 1.

```javascript
fuzzyIncludes('seach', 'search'); // true
fuzzyIncludes('serch', 'search'); // true
```

---

### toastStore

Svelte store for toast notifications.

**Import:**

```javascript
import { toast, showToast, removeToast } from '@mbsmart/ui/utils';
import toasts from '@mbsmart/ui/utils'; // The store itself
```

**Functions:**

#### `toast.success(message, duration?)`

Shows a success toast (green, 3000ms default).

```javascript
toast.success('Settings saved!');
toast.success('Done', 5000); // Custom duration
```

#### `toast.error(message, duration?)`

Shows an error toast (red, 5000ms default).

```javascript
toast.error('Failed to save');
```

#### `toast.info(message, duration?)`

Shows an info toast (blue, 3000ms default).

```javascript
toast.info('Syncing...');
```

#### `toast.warning(message, duration?)`

Shows a warning toast (yellow, 4000ms default).

```javascript
toast.warning('Battery low');
```

#### `showToast(message, type, duration)`

Low-level function for custom toasts.

```javascript
showToast('Custom message', 'info', 0); // 0 = no auto-dismiss
```

#### `removeToast(id)`

Manually removes a toast by ID.

---

### urlUtils

URL processing and manipulation utilities.

**Import:**

```javascript
import {
	normalizeUrl,
	extractDomain,
	isValidUrlOrDomain,
	mergeUrlEntries,
	buildUrlUpdates
} from '@mbsmart/ui/utils';
```

**Functions:**

#### `normalizeUrl(url)`

Normalizes a URL by removing protocol, www, and trailing slashes.

```javascript
normalizeUrl('https://www.example.com/'); // 'example.com'
normalizeUrl('http://sub.example.com/path/'); // 'sub.example.com/path'
```

#### `extractDomain(url)`

Extracts the domain from a URL.

```javascript
extractDomain('https://www.example.com/path'); // 'example.com'
```

#### `isValidUrlOrDomain(str)`

Checks if a string looks like a valid URL/domain.

```javascript
isValidUrlOrDomain('example.com'); // true
isValidUrlOrDomain('invalid string'); // false
```

#### `mergeUrlEntries(urlList)`

Merges URL entries that have &-prefixed extension versions.

```javascript
// API returns separate entries for 'website.com' and '&website.com'
const merged = mergeUrlEntries([
	{ url: 'example.com', state: 'blocked' },
	{ url: '&example.com', state: 'extension_excluded' }
]);
// Result: [{ url: 'example.com', state: 'extension_excluded', hasExtensionEntry: true, ... }]
```

#### `buildUrlUpdates(baseUrl, newState, existingItem?)`

Builds URL update commands for the API.

```javascript
buildUrlUpdates('example.com', 'blocked');
// [{ url: 'example.com', state: 'blocked' }]

buildUrlUpdates('example.com', 'extension_excluded');
// [{ url: 'example.com', state: 'fully_open' }, { url: '&example.com', state: 'extension_excluded' }]

buildUrlUpdates('example.com', 'remove', existingItem);
// Removes both base and &-prefixed if they exist
```

---

## CSS Classes Reference

### Helper Visibility Classes

The package uses CSS classes to hide helper elements:

```css
/* Hide keyboard shortcut hints */
html.hide-kbd .kbd-helper {
	display: none !important;
}

/* Hide info helper tooltips */
html.hide-info-helpers .info-helper {
	display: none !important;
}
```

### Magic Search Classes

For use with `SectionedPage`:

```css
.magicsearch-active        /* Added to wrapper when search is active */
.magicsearch-island        /* Add to Island wrapper divs */
.magicsearch-item          /* Add to individual searchable items */
.magicsearch-match         /* Added by JS when item matches search */
.magicsearch-island-match  /* Added when island title matches */
.magicsearch-nomatches     /* Added when no results found */
.magicsearch-noresults     /* "Nothing found" message container */
```

---

## Internationalization (i18n)

This package now includes a shared i18n engine and language store designed for use across MB Smart projects.

### Exports
Import from the package path `@mbsmart/ui/i18n`:

- `registerTranslations(data)` — merge/register project translations (key-first format: `{ namespace: { key: { en: '...', he: '...' } } }`).
- `t` — reactive translation store for templates: `{$t('namespace.key')}`.
- `tr(key, props)` — non-reactive translator for scripts: `tr('namespace.key', { name: 'John' })`.
- `getTranslation(key, lang, props)`, `hasTranslation(key)`, `addTranslation(namespace, key, langValues)`
- `getNamespaceKeys(namespace)`, `getAvailableLanguages()`

Language store available from same module:

- `language` — Svelte writable store with current language code.
- `setLanguage(lang)`, `setLanguageAndNavigate(lang, currentPath, navigateFn?)` — `setLanguageAndNavigate` accepts an optional navigation function (e.g., SvelteKit's `goto`).
- `getCurrentLanguage()`, `getLanguageInfo(code)`, `SUPPORTED_LANGUAGES`, `DEFAULT_LANGUAGE`, `isRTL()`

### Usage (project)

1. In your app, register translations at startup (example for SvelteKit):

```js
import { registerTranslations } from '@mbsmart/ui/i18n';
import { translations } from '$lib/translations.js';

registerTranslations(translations);
```

2. In components and scripts:

```svelte
<script>
  import { t, tr } from '@mbsmart/ui/i18n';
</script>

<h1>{$t('dashboard.welcome')}</h1>
```

```js
import { tr } from '@mbsmart/ui/i18n';
const msg = tr('toast.success_login');
```

3. Language management:

```js
import { language, setLanguage, SUPPORTED_LANGUAGES } from '@mbsmart/ui/i18n';
setLanguage('he'); // switches language and updates document dir when used in-browser
```

Notes:
- The engine is intentionally data-agnostic: translation DATA should live in each project (as a key-first object) and be registered with `registerTranslations()`; this keeps the shared lib small and allows projects to control their translations and lazy-loading strategies.
- The `setLanguageAndNavigate` helper can accept a navigation function for frameworks that need it (SvelteKit's `goto`).
