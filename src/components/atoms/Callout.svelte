<script>
	/**
	 * Callout - A styled container with a colored left border for announcements,
	 * tips, warnings, and other highlighted content.
	 *
	 * @component
	 * @example
	 * <Callout color="orange">
	 *   <p>Warning: This action cannot be undone.</p>
	 * </Callout>
	 *
	 * @example
	 * <Callout color="azure">
	 *   <p class="font-semibold">Did you know?</p>
	 *   <p>You can use keyboard shortcuts for faster navigation.</p>
	 * </Callout>
	 */

	/**
	 * @typedef {'orange' | 'azure' | 'red' | 'green' | 'yellow' | 'gray'} CalloutColor
	 */

	/** @type {{ color?: CalloutColor, className?: string, children: import('svelte').Snippet }} */
	let { color = 'azure', className = '', children } = $props();

	// Color mappings for light and dark modes
	const colorClasses = {
		orange:
			'border-orange-alt-700/50 bg-orange-alt-50/50 text-orange-alt-700 dark:border-orange-alt-200/50 dark:bg-orange-alt-900/25 dark:text-orange-alt-200',
		azure:
			'border-azure-700/50 bg-azure-50/50 text-azure-700 dark:border-azure-200/50 dark:bg-azure-900/25 dark:text-azure-200',
		red: 'border-red-alt-700/50 bg-red-alt-50/50 text-red-alt-700 dark:border-red-alt-200/50 dark:bg-red-alt-900/25 dark:text-red-alt-200',
		green:
			'border-green-alt-700/50 bg-green-alt-50/50 text-green-alt-700 dark:border-green-alt-200/50 dark:bg-green-alt-900/25 dark:text-green-alt-200',
		yellow:
			'border-yellow-700/50 bg-yellow-50/50 text-yellow-700 dark:border-yellow-200/50 dark:bg-yellow-900/25 dark:text-yellow-200',
		gray: 'border-gray-700/50 bg-gray-50/50 text-gray-700 dark:border-gray-200/50 dark:bg-gray-900/25 dark:text-gray-200'
	};

	const classes = $derived(colorClasses[color] || colorClasses.azure);
</script>

<div class="border-s-4 p-2 sm:p-4 ps-3 sm:ps-6 text-sm sm:text-base {classes} {className}">
	{@render children()}
</div>
