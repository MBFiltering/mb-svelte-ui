<!--
	BackButton Component

	Back navigation control. By default it renders an icon-only CircleButton
	(the long-standing behaviour). Pass a `label` to opt into the labelled
	inline variant — projects that omit it are unaffected.

	Navigation is left to the host app: pass `onclick` for programmatic
	navigation (e.g. SvelteKit's `goto`), or `href` on the labelled variant to
	render a real anchor. With neither, it goes back in history.
-->
<script>
	import { CornerUpLeft } from '@lucide/svelte';
	import CircleButton from './CircleButton.svelte';

	/**
	 * @type {{
	 *   label?: string,
	 *   href?: string,
	 *   onclick?: (event: MouseEvent) => void,
	 *   title?: string,
	 *   icon?: any,
	 *   iconSize?: number,
	 *   color?: string,
	 *   size?: string,
	 *   className?: string
	 * }}
	 */
	let {
		label = '',
		href = '',
		onclick,
		title = '',
		icon = CornerUpLeft,
		iconSize = 20,
		color = 'ghost',
		size = 'md',
		className = ''
	} = $props();

	const Icon = $derived(icon);

	const labelClasses = $derived(
		'group flex cursor-pointer items-center gap-1.5 text-sm font-medium text-azure-700 transition-colors hover:text-azure-900 dark:text-azure-400 dark:hover:text-azure-200 ' +
			className
	);

	// The arrow must turn the way "back" goes in an RTL layout. CornerUpLeft
	// mirrored horizontally is exactly CornerUpRight — same glyph, so one icon
	// covers both directions. Mirror, never rotate: upside down it would become
	// CornerDownRight. The icon-only variant has no text to sit beside, so the
	// whole circle mirrors, which is invisible on a round button.
	const iconOnlyClasses = $derived('rtl:-scale-x-100 ' + className);

	/** @param {MouseEvent} event */
	function handleClick(event) {
		if (onclick) {
			onclick(event);
			return;
		}
		// Anchors navigate on their own; the bare button falls back to history.
		if (!href) history.back();
	}
</script>

{#snippet labelContent()}
	<Icon
		size={iconSize}
		class="shrink-0 transition-transform group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5"
	/>
	<span class="truncate">{label}</span>
{/snippet}

{#if label}
	<!-- Labelled variant: inline arrow + text -->
	{#if href}
		<a {href} {title} onclick={handleClick} class={labelClasses}>{@render labelContent()}</a>
	{:else}
		<button type="button" {title} onclick={handleClick} class={labelClasses}>
			{@render labelContent()}
		</button>
	{/if}
{:else}
	<CircleButton
		{color}
		{size}
		{icon}
		{iconSize}
		{title}
		onclick={handleClick}
		className={iconOnlyClasses}
	/>
{/if}
