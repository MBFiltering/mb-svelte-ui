<script>
	import Info from '../atoms/Info.svelte';

	// Props - Svelte 5 style
	let { label = '', description = '', info = false, infoLabel = '', prefix, children } = $props();
</script>

<div
	class="my-3 flex w-full flex-col justify-between gap-2 rounded-xl border border-neutral-100 p-3 sm:my-0 sm:flex-row sm:items-center sm:rounded-none sm:border-t-0 sm:border-r-0 sm:border-l-0 sm:px-0 dark:border-zinc-750"
>
	<div class="w-full sm:w-auto sm:flex-1">
		<div class="mb-1 flex items-center gap-2 font-medium text-gray-900 sm:mb-0 dark:text-gray-50">
			{#if prefix}
				{@render prefix()}
			{/if}
			<span class="">{label}</span>
			<span class="hidden h-5 sm:inline-block">
				{#if info}
					<Info label={infoLabel || label} />
				{/if}
			</span>
		</div>
		{#if description}
			<div class="text-sm text-gray-600 dark:text-gray-300">{description}</div>
		{/if}
		<div class="inline sm:hidden">
			{#if info}
				<Info label={infoLabel || label} variant="inline" />
			{/if}
		</div>
	</div>
	<div class="ml-auto">
		{@render children?.()}
	</div>
</div>
