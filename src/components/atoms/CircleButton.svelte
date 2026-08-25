<script>
	import { LoaderCircle } from '@lucide/svelte';

	// Props - Svelte 5 style
	let {
		onclick = () => {},
		href = '',
		disabled = false,
		loading = false,
		spinIcon = false,
		label = '',
		title = '',
		ariaLabel = '',
		type = 'button',
		color = 'ghost',
		size = 'md',
		// Defaulted rather than left bare so it is *optional*. The body already
		// handles its absence — a labelled button with no icon is a plain pill —
		// but with no default it was the one prop here without one, which made
		// svelte2tsx generate it as required and every icon-less use a type error.
		icon = undefined,
		iconSize = 18,
		className = '',
		iconClassName = ''
	} = $props();

	// `<svelte:component>` is deprecated in runes mode — a capitalised binding
	// is dynamic on its own (same shape as BackButton).
	const Icon = $derived(icon);

	// Color variants
	const colorClasses = {
		ghost: 'text-gray-700 hover:bg-gray-900/10 dark:text-gray-200 dark:hover:bg-gray-50/10',
		ghost2: 'text-gray-500 hover:bg-gray-900/10 dark:text-gray-400 dark:hover:bg-gray-50/10',
		// Matches ControlButton's azure exactly, in both themes — see the note on
		// its own colorClasses. The dark-mode override is deliberately gone: it
		// lightened the pill to azure-500 (3.56:1) precisely where the surface
		// behind it is darkest, and one colour that clears AA everywhere beats two
		// that swap.
		azure: 'bg-azure-600 text-white hover:bg-azure-800',
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

	// With a label the circle becomes a pill: the block padding is the circle's,
	// so a labelled button lines up with an icon-only one in the same row, and
	// the inline sides get the room the text needs. `rounded-full` still carries
	// no `g2` — a pill is a circle stretched, not a squircle.
	const labelledSizeClasses = {
		sm: 'py-1.5 ps-2.5 pe-3 gap-1.5 text-sm',
		md: 'py-2 ps-3 pe-3.5 gap-2 text-sm',
		lg: 'py-3 ps-4 pe-5 gap-2.5 text-base'
	};

	const colorClass = $derived(colorClasses[color] || colorClasses.ghost);
	const sizeClass = $derived(
		label
			? labelledSizeClasses[size] || labelledSizeClasses.md
			: sizeClasses[size] || sizeClasses.md
	);

	// A labelled button is a flex row; an icon-only one is left as it was, so
	// nothing that already relies on its box changes.
	const layoutClass = $derived(label ? 'inline-flex items-center font-medium' : '');

	const classes = $derived(
		`cursor-pointer rounded-full transition-colors disabled:opacity-50 ${
			loading ? 'cursor-wait' : 'disabled:cursor-default'
		} ${layoutClass} ${colorClass} ${sizeClass} ${className}`
	);

	// A visible label already names the button; `ariaLabel` is for the icon-only
	// form, and setting both would let the two disagree.
	const accessibleName = $derived(label ? undefined : ariaLabel || undefined);
</script>

{#snippet body()}
	<!-- An icon-only button has no label to grey out, so the icon itself has to
	     carry the wait. `spinIcon` spins the glyph in place — right where the
	     icon already means "refresh" or "sync" and rotation reads as progress.
	     Otherwise a same-size spinner stands in for it, so the circle holds its
	     shape either way. -->
	{#if loading && !spinIcon}
		<LoaderCircle size={iconSize} class="shrink-0 animate-spin {iconClassName}" aria-hidden="true" />
	{:else if Icon}
		<Icon
			size={iconSize}
			class="shrink-0 {loading && spinIcon ? 'animate-spin' : ''} {iconClassName}"
			aria-hidden="true"
		/>
	{/if}
	{#if label}
		<span class="truncate">{label}</span>
	{/if}
{/snippet}

{#if href}
	<!-- A real link when the button navigates: middle-click and "open in new
	     tab" work, which they never can on a `<button>`. `disabled`/`loading`
	     have no meaning on an anchor and are ignored here. -->
	<a {href} {onclick} {title} aria-label={accessibleName} class={classes}>
		{@render body()}
	</a>
{:else}
	<button
		{onclick}
		disabled={disabled || loading}
		{title}
		{type}
		aria-label={accessibleName}
		aria-busy={loading}
		class={classes}
	>
		{@render body()}
	</button>
{/if}
