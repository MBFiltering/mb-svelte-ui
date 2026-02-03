<script>
	// Props - Svelte 5 style
	let {
		label = '',
		variant = 'tooltip',
		// i18n props - override internal directory lookup
		infoTextOverride = '', // Direct text to display
		infoWidthOverride = '', // Direct width for tooltip
		infoDirectory = null // Directory to use for label lookup
	} = $props();

	let showTooltip = $state(false);

	// Get info text for this label (override takes precedence)
	const infoText = $derived(infoTextOverride || infoDirectory?.[label]?.text || '');

	// Get info width for this label (override takes precedence)
	const infoWidth = $derived(infoWidthOverride || infoDirectory?.[label]?.width || 'auto');

	// Import Lucide Info icon
	import { Info } from '@lucide/svelte';
</script>

{#if infoText}
	{#if variant === 'tooltip'}
		<div
			class="info-helper relative inline-block"
			onmouseenter={() => (showTooltip = true)}
			onmouseleave={() => (showTooltip = false)}
			role="tooltip"
			aria-label="Information"
		>
			<!-- Lucide Info Icon -->
			<Info
				class="h-4 w-4 cursor-help text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
				aria-hidden="true"
			/>

			<!-- Tooltip -->
			{#if showTooltip}
				<div
					class="absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 -translate-y-2 transform whitespace-normal"
				>
					<!-- Arrow -->
					<div
						class="absolute top-full left-1/2 -translate-x-1/2 transform border-8 border-transparent border-t-gray-700"
					></div>
					<!-- Tooltip Content -->
					<div
						class="rounded-lg bg-gray-700 px-3 py-2 text-xs font-normal text-white"
						style="width: {infoWidth};"
					>
						{@html infoText}
					</div>
				</div>
			{/if}
		</div>
	{:else if variant === 'inline'}
		<span class="info-helper text-sm text-gray-600 dark:text-gray-300">{@html infoText}</span>
	{/if}
{/if}
