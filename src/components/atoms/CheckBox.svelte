<script>
	import { Check, Minus } from '@lucide/svelte';

	/**
	 * Custom Checkbox component with Lucide icons
	 * Supports checked, unchecked, and indeterminate states
	 */
	let {
		checked = false,
		indeterminate = false,
		disabled = false,
		ariaLabel = '',
		onclick = () => {}
	} = $props();
</script>

<label
	class="relative inline-flex cursor-pointer items-center {disabled
		? 'cursor-default opacity-50'
		: ''}"
>
	<!-- Hidden native checkbox for accessibility -->
	<input
		type="checkbox"
		{checked}
		{disabled}
		aria-label={ariaLabel}
		onclick={(e) => {
			if (!disabled) {
				onclick(e);
			}
		}}
		class="peer absolute h-0 w-0 opacity-0"
	/>
	<!-- Custom checkbox visual -->
	<div
		class="flex h-5 w-5 items-center justify-center rounded border transition-colors
			{checked || indeterminate
			? 'border-azure-700 bg-azure-700'
			: 'border-gray-300 bg-white hover:border-azure-500'}"
	>
		{#if checked && !indeterminate}
			<Check size={14} strokeWidth={3} class="text-white" />
		{:else if indeterminate}
			<Minus size={14} strokeWidth={3} class="text-white" />
		{/if}
	</div>
</label>
