<script>
	/**
	 * NavButton - Navigation button/link for header use
	 * Supports both link (href) and button (onclick) modes
	 * Has color variants for different purposes (azure for actions, red for logout, etc.)
	 */
	let {
		href = '',
		onclick = null,
		icon = null,
		label = '',
		title = '',
		color = 'azure',
		disabled = false,
		className = ''
	} = $props();

	// Color variants
	const colorClasses = {
		azure:
			'border-azure-100 dark:border-azure-800 bg-azure-50 dark:bg-azure-900 text-azure-700 dark:text-azure-200 hover:bg-azure-100 dark:hover:bg-azure-800',
		red: 'border-red-alt-200 dark:border-red-alt-700 bg-red-alt-100 dark:bg-red-alt-800 text-red-alt-700 dark:text-red-alt-200 hover:bg-red-alt-200 dark:hover:bg-red-alt-700',
		green:
			'border-green-alt-200 dark:border-green-alt-700 bg-green-alt-100 dark:bg-green-alt-800 text-green-alt-700 dark:text-green-alt-200 hover:bg-green-alt-200 dark:hover:bg-green-alt-700',
		gray: 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
	};

	const baseClasses = `flex items-center gap-2 rounded-lg border px-2 py-2 font-medium transition-colors lg:px-4 ${colorClasses[color] || colorClasses.azure} ${className}`;
	const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
</script>

{#if href && !onclick}
	<!-- Link mode -->
	<a
		{href}
		class="{baseClasses} {disabledClasses}"
		title={title || label}
		aria-label={title || label}
	>
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent size={18} strokeWidth={2} />
		{/if}
		{#if label}
			<span class="hidden text-sm lg:inline">{label}</span>
		{/if}
	</a>
{:else}
	<!-- Button mode -->
	<button
		type="button"
		{onclick}
		{disabled}
		class="{baseClasses} {disabledClasses}"
		title={title || label}
		aria-label={title || label}
	>
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent size={18} strokeWidth={2} />
		{/if}
		{#if label}
			<span class="hidden text-sm lg:inline">{label}</span>
		{/if}
	</button>
{/if}
