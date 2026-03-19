<script>
	import { getNavButtonColorClasses, getNavButtonStateClasses } from './navButtonStyles.js';

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

	const baseClasses = $derived(
		`flex items-center gap-2 rounded-lg border px-2 py-2 font-medium transition-colors xl:px-4 ${getNavButtonColorClasses(color)} ${className}`
	);
	const disabledClasses = $derived(getNavButtonStateClasses(disabled));
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
			<span class="hidden text-sm xl:inline">{label}</span>
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
			<span class="hidden text-sm xl:inline">{label}</span>
		{/if}
	</button>
{/if}
