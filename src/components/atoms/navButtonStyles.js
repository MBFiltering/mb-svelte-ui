export const NAV_BUTTON_COLOR_CLASSES = {
	azure:
		'border-azure-100 dark:border-azure-800 bg-azure-50 dark:bg-azure-900 text-azure-700 dark:text-azure-200 hover:bg-azure-100 dark:hover:bg-azure-800',
	red: 'border-red-alt-200 dark:border-red-alt-700 bg-red-alt-100 dark:bg-red-alt-800 text-red-alt-700 dark:text-red-alt-200 hover:bg-red-alt-200 dark:hover:bg-red-alt-700',
	green:
		'border-green-alt-200 dark:border-green-alt-700 bg-green-alt-100 dark:bg-green-alt-800 text-green-alt-700 dark:text-green-alt-200 hover:bg-green-alt-200 dark:hover:bg-green-alt-700',
	gray: 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
};

export function getNavButtonColorClasses(color = 'azure') {
	return NAV_BUTTON_COLOR_CLASSES[color] || NAV_BUTTON_COLOR_CLASSES.azure;
}

export function getNavButtonStateClasses(disabled = false) {
	return disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
}

/**
 * Full-width labelled row used inside a nav popover — the NavDropdown panel and
 * the HeaderNav hamburger menu, which must look like one another.
 *
 * @param {{ color?: string, disabled?: boolean, className?: string }} item
 */
export function getNavMenuItemClasses(item = {}) {
	return `g2 flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-start text-sm font-medium transition-colors ${getNavButtonColorClasses(item.color)} ${getNavButtonStateClasses(item.disabled)} ${item.className || ''}`;
}

/** Shared shell for a nav popover panel: the dropdown and the hamburger menu. */
export const NAV_PANEL_CLASSES =
	'g2 absolute end-0 z-50 mt-2 min-w-56 space-y-1.5 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg dark:border-zinc-700 dark:bg-zinc-900';