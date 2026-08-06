<script>
	// Props - Svelte 5 style
	let {
		// Array of { id, label, icon?, color? } — icon is an optional Lucide
		// component, color a key of TAB_COLORS (default 'azure')
		tabs = [],
		active = $bindable(),
		ariaLabel = 'Tabs',
		onChange = () => {}
	} = $props();

	/**
	 * Per-tab palettes, sharing the safety vocabulary of `categoryColors.js`, so a
	 * strip of tabs can carry the same green → red meaning as a `SafetyBadge`.
	 *
	 * A colored tab keeps its color while idle — the color *is* the label's
	 * meaning, so dropping it to gray would hide the scale until you clicked
	 * through it. The active tab is marked by its underline and tint instead.
	 * `azure` is the plain default and is the one palette that greys out idle.
	 */
	const TAB_COLORS = {
		azure: {
			active: 'border-azure-700 text-azure-700 dark:border-azure-500 dark:text-azure-500',
			idle: 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50'
		},
		green: {
			active:
				'border-green-alt-600 bg-green-alt-500/10 text-green-alt-800 dark:border-green-alt-400 dark:bg-green-alt-400/10 dark:text-green-alt-200',
			idle: 'border-transparent text-green-alt-700 hover:bg-green-alt-500/10 dark:text-green-alt-300'
		},
		yellow: {
			active:
				'border-yellow-600 bg-yellow-500/10 text-yellow-800 dark:border-yellow-400 dark:bg-yellow-400/10 dark:text-yellow-200',
			idle: 'border-transparent text-yellow-700 hover:bg-yellow-500/10 dark:text-yellow-300'
		},
		orange: {
			active:
				'border-orange-alt-600 bg-orange-alt-500/10 text-orange-alt-800 dark:border-orange-alt-400 dark:bg-orange-alt-400/10 dark:text-orange-alt-200',
			idle: 'border-transparent text-orange-alt-700 hover:bg-orange-alt-500/10 dark:text-orange-alt-300'
		},
		red: {
			active:
				'border-red-alt-600 bg-red-alt-500/10 text-red-alt-800 dark:border-red-alt-400 dark:bg-red-alt-400/10 dark:text-red-alt-200',
			idle: 'border-transparent text-red-alt-700 hover:bg-red-alt-500/10 dark:text-red-alt-300'
		},
		gray: {
			active:
				'border-gray-600 bg-gray-500/10 text-gray-800 dark:border-gray-400 dark:bg-gray-400/10 dark:text-gray-200',
			idle: 'border-transparent text-gray-700 hover:bg-gray-500/10 dark:text-gray-300'
		}
	};

	function select(id) {
		active = id;
		onChange(id);
	}
</script>

<!--
	Tab strip. Wraps onto additional rows when there isn't enough horizontal
	room (flex-wrap), so it degrades gracefully on narrow / mobile screens.
-->
<div
	role="group"
	aria-label={ariaLabel}
	class="flex flex-wrap gap-x-2 gap-y-1 border-b border-neutral-100 pb-1 dark:border-zinc-750"
>
	{#each tabs as tab}
		{@const IconComponent = tab.icon}
		{@const palette = TAB_COLORS[tab.color] || TAB_COLORS.azure}
		<button
			type="button"
			aria-pressed={active === tab.id}
			onclick={() => select(tab.id)}
			class="g2 flex cursor-pointer items-center gap-2 rounded-t-lg border-b-2 px-4 py-2 text-sm font-medium transition-colors {active ===
			tab.id
				? palette.active
				: palette.idle}"
		>
			{#if IconComponent}
				<IconComponent size={16} />
			{/if}
			{tab.label}
		</button>
	{/each}
</div>
