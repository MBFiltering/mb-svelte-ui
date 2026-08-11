<script>
	import { LoaderCircle } from '@lucide/svelte';

	// Props - Svelte 5 style
	let {
		onclick = () => {},
		disabled = false,
		loading = false,
		spinIcon = false,
		title = '',
		ariaLabel = '',
		type = 'button',
		color = 'ghost',
		size = 'md',
		icon,
		iconSize = 18,
		className = ''
	} = $props();

	// `<svelte:component>` is deprecated in runes mode — a capitalised binding
	// is dynamic on its own (same shape as BackButton).
	const Icon = $derived(icon);

	// Color variants
	const colorClasses = {
		ghost: 'text-gray-700 hover:bg-gray-900/10 dark:text-gray-200 dark:hover:bg-gray-50/10',
		ghost2: 'text-gray-500 hover:bg-gray-900/10 dark:text-gray-400 dark:hover:bg-gray-50/10',
		azure: 'bg-azure-700 text-white hover:bg-azure-900 dark:bg-azure-500 dark:hover:bg-azure-700',
		green: 'bg-green-alt-500 text-white hover:bg-green-alt-600',
		red: 'bg-red-alt-500 text-white hover:bg-red-alt-600',
		orange: 'bg-orange-alt-500 text-white hover:bg-orange-alt-600',
		gray: 'bg-gray-500 text-white hover:bg-neutral-600'
	};

	// Size variants (padding)
	const sizeClasses = {
		sm: 'p-1.5',
		md: 'p-2',
		lg: 'p-3'
	};

	const colorClass = $derived(colorClasses[color] || colorClasses.ghost);
	const sizeClass = $derived(sizeClasses[size] || sizeClasses.md);
</script>

<button
	{onclick}
	disabled={disabled || loading}
	{title}
	{type}
	aria-label={ariaLabel || undefined}
	aria-busy={loading}
	class="cursor-pointer rounded-full transition-colors disabled:opacity-50 {loading
		? 'cursor-wait'
		: 'disabled:cursor-default'} {colorClass} {sizeClass} {className}"
>
	<!-- An icon-only button has no label to grey out, so the icon itself has to
	     carry the wait. `spinIcon` spins the glyph in place — right where the
	     icon already means "refresh" or "sync" and rotation reads as progress.
	     Otherwise a same-size spinner stands in for it, so the circle holds its
	     shape either way. -->
	{#if loading && !spinIcon}
		<LoaderCircle size={iconSize} class="animate-spin" aria-hidden="true" />
	{:else if Icon}
		<Icon size={iconSize} class={loading && spinIcon ? 'animate-spin' : ''} aria-hidden="true" />
	{/if}
</button>
