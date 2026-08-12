<!--
	BackButton Component

	Back navigation control. It is a CircleButton either way: icon-only by
	default, and a labelled pill (arrow + text inside the same button) when you
	pass a `label`. Projects that omit it are unaffected.

	Navigation is left to the host app: pass `href` to render a real anchor, or
	`onclick` for programmatic navigation (e.g. SvelteKit's `goto`). With
	neither, it goes back in history.
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
	 *   ariaLabel?: string,
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
		ariaLabel = '',
		icon = CornerUpLeft,
		iconSize = 20,
		color = 'ghost',
		size = 'md',
		className = ''
	} = $props();

	// The arrow must turn the way "back" goes in an RTL layout. CornerUpLeft
	// mirrored horizontally is exactly CornerUpRight — same glyph, so one icon
	// covers both directions. Mirror, never rotate: upside down it would become
	// CornerDownRight.
	//
	// Which element gets mirrored depends on the variant. The icon-only button
	// has no text to sit beside, so the whole circle flips, which is invisible
	// on a round button. The labelled pill must flip the glyph alone — flipping
	// the button would flip its text with it.
	const buttonClasses = $derived((label ? '' : 'rtl:-scale-x-100 ') + className);
	const iconClasses = $derived(label ? 'rtl:-scale-x-100' : '');

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

<CircleButton
	{href}
	{label}
	{title}
	{ariaLabel}
	{color}
	{size}
	{icon}
	{iconSize}
	onclick={handleClick}
	className={buttonClasses}
	iconClassName={iconClasses}
/>
