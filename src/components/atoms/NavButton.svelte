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
		azure: 'border-azure-100 bg-azure-50 text-azure-700 hover:bg-azure-100',
		red: 'border-red-alt-200 bg-red-alt-100 text-red-alt-700 hover:bg-red-alt-200',
		green: 'border-green-alt-200 bg-green-alt-100 text-green-alt-700 hover:bg-green-alt-200',
		gray: 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
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
