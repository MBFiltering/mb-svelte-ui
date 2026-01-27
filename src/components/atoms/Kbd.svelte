<script>
	// Props - Svelte 5 style
	let { children } = $props();
</script>

<span
	class="kbd-helper rounded-lg border border-azure-500 bg-azure-50 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-azure-700"
>
	{@render children?.()}
</span>
