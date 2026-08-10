<script>
	/**
	 * ToggleSwitch
	 *
	 * Naming: pass `ariaLabel` (or the older `customLabel`) and it names the
	 * switch. Pass nothing and no `aria-label` is emitted at all — which is the
	 * point. Almost every call site wraps this in `NamedControl`, whose
	 * `role="group" aria-labelledby` already names the row; an `aria-label` here
	 * would *override* that, and the old `Toggle ${label}` default did exactly
	 * that on every toggle in both portals. It also concatenated English, which
	 * the style guide forbids.
	 */
	let {
		label = '', // Visible-label hint, kept for callers that pass it
		ariaLabel = '',
		customLabel = null,
		checked = false,
		onChange = () => {},
		disabled = false,
		colorOn = 'bg-azure-500',
		colorOff = 'bg-gray-300 dark:bg-gray-600',
		variant = 'default',
		iconOn = null,
		iconOff = null,
		iconSize = 18,
		onText = 'On',
		offText = 'Off',
	} = $props();

	// Only emit a name when one was actually supplied — see the note above.
	const name = $derived(customLabel || ariaLabel || undefined);
</script>

{#if variant === 'icon'}
	<button
		type="button"
		onclick={() => !disabled && onChange(!checked)}
		{disabled}
		class="g2 flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors disabled:cursor-default disabled:opacity-50 {checked
			? colorOn.replace('bg-', 'bg-') + ' text-white dark:text-zinc-750'
			: colorOff.replace('bg-', 'bg-') + ' text-gray-700 dark:text-gray-200'}"
		aria-label={name}
		title={name}
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
	<div class="flex gap-2 items-center">
		<p class="text-sm font-medium text-gray-700 dark:text-gray-200">
			{checked ? onText : offText}
		</p>
		<button
			type="button"
			onclick={() => !disabled && onChange(!checked)}
			{disabled}
			class="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors disabled:cursor-default disabled:opacity-50 {checked
				? colorOn
				: colorOff}"
			aria-label={name}
			role="switch"
			aria-checked={checked}
		>
			<span
				class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {checked
					? 'ltr:translate-x-6 rtl:-translate-x-6'
					: 'ltr:translate-x-1 rtl:-translate-x-1'}"
			></span>
		</button>
	</div>
{/if}
