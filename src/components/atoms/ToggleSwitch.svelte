<script>
	import { playSound } from '../../utils/playSound.js';

	// Props - Svelte 5 style
	let {
		label = '', // Used for aria-label
		customLabel = null,
		checked = false,
		onChange = () => {},
		soundOn = null,
		soundOff = null,
		disabled = false,
		colorOn = 'bg-azure-500',
		colorOff = 'bg-gray-300 dark:bg-gray-600',
		variant = 'default',
		iconOn = null,
		iconOff = null,
		iconSize = 18
	} = $props();

	function handleToggle() {
		if (disabled) return;
		const nextChecked = !checked;
		playSound(nextChecked ? soundOn : soundOff);
		onChange(nextChecked);
	}
</script>

{#if variant === 'icon'}
	<button
		type="button"
		onclick={handleToggle}
		{disabled}
		class="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors disabled:cursor-default disabled:opacity-50 {checked
			? colorOn.replace('bg-', 'bg-') + ' text-white dark:text-zinc-750'
			: colorOff.replace('bg-', 'bg-') + ' text-gray-700 dark:text-gray-200'}"
		aria-label={customLabel || `Toggle ${label}`}
		title={customLabel || `Toggle ${label}`}
		role="switch"
		aria-checked={checked}
	>
		{#if checked && iconOn}
			{@const IconOn = iconOn}
			<IconOn size={iconSize} />
		{:else if !checked && iconOff}
			{@const IconOff = iconOff}
			<IconOff size={iconSize} />
		{/if}
	</button>
{:else}
	<button
		type="button"
		onclick={handleToggle}
		{disabled}
		class="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors disabled:cursor-default disabled:opacity-50 {checked
			? colorOn
			: colorOff}"
		aria-label={customLabel || `Toggle ${label}`}
		role="switch"
		aria-checked={checked}
	>
		<span
			class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {checked
				? 'ltr:translate-x-6 rtl:-translate-x-6'
				: 'ltr:translate-x-1 rtl:-translate-x-1'}"
		></span>
	</button>
{/if}
