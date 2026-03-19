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