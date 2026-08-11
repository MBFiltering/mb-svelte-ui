<script>
	import { LoaderCircle } from '@lucide/svelte';

	// Props - Svelte 5 style
	let {
		onclick = () => {},
		disabled = false,
		loading = false,
		loadingLabel = '',
		color = 'azure',
		size = 'md',
		type = 'button',
		className = '',
		children
	} = $props();

	// Color variants
	const colorClasses = {
		azure: 'bg-azure-500 hover:bg-azure-700 disabled:bg-gray-400 text-white',
		mulberry: 'bg-mulberry-500 hover:bg-mulberry-700 disabled:bg-gray-400 text-white',
		green: 'bg-green-alt-500 hover:bg-green-alt-600 disabled:bg-gray-400 text-white',
		orange: 'bg-orange-alt-500 hover:bg-orange-alt-600 disabled:bg-gray-400 text-white',
		red: 'bg-red-alt-500 hover:bg-red-alt-600 disabled:bg-gray-400 text-white',
		gray: 'bg-gray-500 hover:bg-neutral-600 disabled:bg-gray-400 text-white',
		black: 'bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white',
		transparent: 'bg-transparent hover:bg-gray-100 disabled:bg-gray-50 text-gray-700',
		white: 'bg-white hover:bg-gray-100 disabled:bg-gray-50 text-gray-700'
	};

	// Size variants
	const sizeClasses = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base'
	};

	const spinnerSize = { sm: 14, md: 16, lg: 20 };

	const colorClass = $derived(colorClasses[color] || colorClasses.azure);
	const sizeClass = $derived(sizeClasses[size] || sizeClasses.md);
</script>

<button
	{onclick}
	disabled={disabled || loading}
	{type}
	aria-busy={loading}
	class="g2 relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-all transition-shadows hover:scale-101 hover:shadow-md disabled:hover:scale-100 disabled:hover:shadow-none {loading
		? 'cursor-wait'
		: 'disabled:cursor-default'} {colorClass} {sizeClass} {className}"
>
	{#if loading && loadingLabel}
		<!-- Explained wait: the label names what is happening, so it replaces the
		     children outright and the button is free to resize around it. -->
		<LoaderCircle size={spinnerSize[size] || 16} class="animate-spin" aria-hidden="true" />
		<span>{loadingLabel}</span>
	{:else}
		<!-- Silent wait: the children keep their box so the button never resizes
		     under the pointer, and stay in the accessibility tree so the button
		     keeps its name — `opacity-0`, never `invisible` or `{#if}`. The
		     spinner is laid over that reserved space. -->
		<span
			class="inline-flex items-center justify-center gap-2 transition-opacity {loading
				? 'opacity-0'
				: ''}"
		>
			{@render children()}
		</span>
		{#if loading}
			<span class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
				<LoaderCircle size={spinnerSize[size] || 16} class="animate-spin" />
			</span>
		{/if}
	{/if}
</button>
