<script>
	/**
	 * Badge - A small outlined indicator pill for status labels like PRO/BASIC, Paid/Unpaid, etc.
	 *
	 * @component
	 * @example
	 * <Badge color="mulberry">PRO</Badge>
	 * <Badge color="azure" size="tiny">BASIC</Badge>
	 * <Badge color="green" size="small">Paid</Badge>
	 */

	/**
	 * @typedef {'azure' | 'mulberry' | 'green' | 'red' | 'orange' | 'yellow' | 'gray'} BadgeColor
	 * @typedef {'small' | 'tiny'} BadgeSize
	 */

	/** @type {{ color?: BadgeColor, size?: BadgeSize, className?: string, children: import('svelte').Snippet }} */
	let { color = 'azure', size = 'small', className = '', children } = $props();

	// Color mappings (border + lighter background)
	const colorClasses = {
		azure:
			'border-azure-500 bg-azure-100 text-azure-500 dark:border-azure-200/25 dark:bg-azure-800 dark:text-azure-200',
		mulberry:
			'border-mulberry-700 bg-mulberry-100 text-mulberry-700 dark:border-mulberry-200/25 dark:bg-mulberry-800 dark:text-mulberry-200',
		green:
			'border-green-alt-500 bg-green-100 text-green-alt-700 dark:border-green-alt-200/25 dark:bg-green-800 dark:text-green-alt-200',
		red: 'border-red-alt-500 bg-red-100 text-red-alt-700 dark:border-red-alt-200/25 dark:bg-red-800 dark:text-red-alt-200',
		orange:
			'border-orange-alt-500 bg-orange-alt-100 text-orange-alt-700 dark:border-orange-alt-200/25 dark:bg-orange-alt-800 dark:text-orange-alt-200',
		yellow:
			'border-yellow-500 bg-yellow-100 text-yellow-700 dark:border-yellow-200/25 dark:bg-yellow-800 dark:text-yellow-200',
		gray: 'border-gray-500 bg-gray-100 text-gray-700 dark:border-gray-200/25 dark:bg-gray-800 dark:text-gray-200'
	};

	// Size mappings
	const sizeClasses = {
		small: 'px-2 py-0.5 border',
		tiny: 'px-1.5 py-0'
	};

	const colors = $derived(colorClasses[color] || colorClasses.azure);
	const sizeClass = $derived(sizeClasses[size] || sizeClasses.small);
</script>

<span class="pointer-events-none rounded text-xs font-medium {sizeClass} {colors} {className}">
	{@render children()}
</span>
