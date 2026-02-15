<script>
	import { Check, Minus } from '@lucide/svelte';
	import { playSound } from '../../utils/playSound.js';

	/**
	 * Custom Checkbox component with Lucide icons
	 * Supports checked, unchecked, and indeterminate states
	 */
	let {
		checked = false,
		indeterminate = false,
		disabled = false,
		ariaLabel = '',
		soundOn = null,
		soundOff = null,
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
				const nextChecked = indeterminate ? true : !checked;
				playSound(nextChecked ? soundOn : soundOff);
				onclick(e);
			}
		}}
		class="peer absolute h-0 w-0 opacity-0"
	/>
	<!-- Custom checkbox visual -->
	<div
		class="flex h-5 w-5 items-center justify-center rounded border transition-colors
			{checked || indeterminate
			? 'border-azure-700 bg-azure-700 dark:border-azure-500 dark:bg-azure-500'
			: 'border-gray-300 bg-white hover:border-azure-500 dark:border-gray-600 dark:bg-zinc-800 dark:hover:border-azure-300'}"
	>
		{#if checked && !indeterminate}
			<Check size={14} strokeWidth={3} class="text-white" />
		{:else if indeterminate}
			<Minus size={14} strokeWidth={3} class="text-white" />
		{/if}
	</div>
</label>
