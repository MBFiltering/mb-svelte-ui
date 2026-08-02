<script>
	// Props - Svelte 5 style
	let {
		tabs = [], // Array of { id, label, icon? } — icon is an optional Lucide component
		active = $bindable(),
		onChange = () => {}
	} = $props();

	function select(id) {
		active = id;
		onChange(id);
	}
</script>

<!--
	Tab strip. Wraps onto additional rows when there isn't enough horizontal
	room (flex-wrap), so it degrades gracefully on narrow / mobile screens.
-->
<div class="flex flex-wrap gap-x-2 gap-y-1 border-b border-neutral-100 pb-1 dark:border-zinc-750">
	{#each tabs as tab}
		{@const IconComponent = tab.icon}
		<button
			type="button"
			onclick={() => select(tab.id)}
			class="g2 flex cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors {active ===
			tab.id
				? 'border-b-2 border-azure-700 text-azure-700 dark:border-azure-500 dark:text-azure-500'
				: 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50'}"
		>
			{#if IconComponent}
				<IconComponent size={16} />
			{/if}
			{tab.label}
		</button>
	{/each}
</div>
