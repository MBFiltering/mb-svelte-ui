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
	//
	// **Azure is azure-600 on azure-800, and CircleButton's azure is the same
	// pair** (August 2026). It was 500 on 700, which measures 3.56:1 against
	// white — a 1.4.3 failure logged in the WCAG audit, whose prescribed fix was
	// azure-600 (4.85:1) or azure-700. The two atoms had disagreed about what
	// "azure" meant since they were written: this one lighter and failing, the
	// pill darker and passing. They now name one colour, and it is the lighter of
	// the two that still clears AA. The other five variants keep their -500 and
	// are still on the audit's list.
	const colorClasses = {
		azure: 'bg-azure-600 hover:bg-azure-800 disabled:bg-gray-400 text-white',
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

	// The ghost variant has no face to light, so it sits this one out: a rim and
	// a drop shadow would draw the outline of a button the design is deliberately
	// not showing. Every filled variant gets the treatment, `white` included —
	// the white layers no-op against a white ground, and the bottom shade and
	// drop shadow carry it on their own.
	const raisedClass = $derived(color === 'transparent' ? '' : 'raised');
</script>

<button
	{onclick}
	disabled={disabled || loading}
	{type}
	aria-busy={loading}
	class="g2 relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-all duration-100 motion-safe:enabled:hover:scale-101 motion-safe:enabled:active:scale-99 {raisedClass} {loading
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
