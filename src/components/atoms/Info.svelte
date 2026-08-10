<script>
	// Props - Svelte 5 style
	let {
		label = '',
		variant = 'tooltip',
		// i18n props - override internal directory lookup
		infoTextOverride = '', // Direct text to display
		infoWidthOverride = '', // Direct width for tooltip
		infoDirectory = null, // Directory to use for label lookup
		// Names the trigger. Host apps pass a translated string; where the row it
		// belongs to has a label, include it — "More information: Text filtering".
		ariaLabel = 'More information'
	} = $props();

	let showTooltip = $state(false);

	// Get info text for this label (override takes precedence)
	const infoText = $derived(infoTextOverride || infoDirectory?.[label]?.text || '');

	// Get info width for this label (override takes precedence)
	const infoWidth = $derived(infoWidthOverride || infoDirectory?.[label]?.width || 'auto');

	// The bubble is tied to the trigger by aria-describedby, so the help text is
	// announced as the trigger's description rather than floating unassociated.
	// ($props.id() has to be the whole initializer — it cannot be interpolated.)
	const uid = $props.id();
	const tooltipId = `info-tooltip-${uid}`;

	// Import Lucide Info icon
	import { Info } from '@lucide/svelte';

	/** 1.4.13: the bubble has to be dismissible without moving the pointer. */
	function handleKeydown(event) {
		if (event.key === 'Escape' && showTooltip) {
			event.stopPropagation();
			showTooltip = false;
		}
	}
</script>

{#if infoText}
	{#if variant === 'tooltip'}
		<!-- A real button, not a div: the help text has to be reachable by keyboard
		     and touch, not only by hovering a pointer over it. -->
		<div class="info-helper relative inline-block">
			<button
				type="button"
				class="flex cursor-help items-center rounded-full text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
				aria-label={ariaLabel}
				aria-describedby={showTooltip ? tooltipId : undefined}
				aria-expanded={showTooltip}
				onclick={() => (showTooltip = !showTooltip)}
				onmouseenter={() => (showTooltip = true)}
				onmouseleave={() => (showTooltip = false)}
				onfocus={() => (showTooltip = true)}
				onblur={() => (showTooltip = false)}
				onkeydown={handleKeydown}
			>
				<Info class="h-4 w-4" aria-hidden="true" />
			</button>

			<!-- Tooltip -->
			{#if showTooltip}
				<div
					id={tooltipId}
					role="tooltip"
					class="absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 -translate-y-2 transform whitespace-normal"
				>
					<!-- Arrow -->
					<div
						class="absolute top-full left-1/2 -translate-x-1/2 transform border-8 border-transparent border-t-gray-700"
						aria-hidden="true"
					></div>
					<!-- Tooltip Content -->
					<div
						class="g2 rounded-lg bg-gray-700 px-3 py-2 text-xs font-normal text-white"
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
