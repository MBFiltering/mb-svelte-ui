<!--
	PageHeader Component

	The title block a page with a way out wears: a labelled back pill on its own
	row, the `<h1>` under it, and an optional quieter line under that. Eight
	pages across two portals were spelling this by hand, down to the same
	`text-xl font-bold text-gray-700 sm:text-3xl dark:text-gray-200`, and the two
	portals had already drifted into two different layouts for it.

	As the page scrolls, a compact bar takes over: the pill loses its text and
	the title comes back beside it, smaller, pinned under the app header. This is
	the phone-app idiom — the way out stays reachable however far down you are —
	and it is what reconciles the two layouts, because the compact state *is* the
	technician portal's old inline row and the expanded state *is* the customer
	portal's stacked one.

	Navigation is left to the host app, the same way `BackButton` leaves it: pass
	`href` for a real anchor, `onback` for programmatic navigation, neither for
	`history.back()`. A language-aware router belongs in the app, not here.

	How the collapse is built, and why:

	- **The compact bar has no height in flow.** It is an overlay inside a
	  zero-height sticky box, so toggling it never moves the content under it. A
	  bar that took real height would shove the page up by its own height the
	  moment it appeared, and that shove can move the trigger back out of range
	  and start the bar flickering on and off.
	- **It is a root element of its own, beside the header block rather than
	  inside it.** `position: sticky` is confined to its parent box, so a wrapper
	  around the header would let the bar travel the header's height and then
	  scroll away. That also means this component renders two roots, so a parent
	  that is a `flex` column with a `gap` pays that gap for the zero-height bar
	  as well. Space the header with `className` instead.
	- **A sentinel and an IntersectionObserver, not a scroll handler.** The
	  sentinel sits at the bottom of the in-flow block; the bar appears exactly
	  as the big title disappears under the app header, so there is never a
	  moment with no title and never a moment with two.
	- **The bar is still the page, not a card.** No rounding, no blur. It is
	  painted in the page's own background, opaque so content passing underneath
	  disappears cleanly — a host that paints its pages some other color gets a
	  strip of `neutral-100` here. It is a little wider than the column (`-mx-4`)
	  so Island `shadow-lg` does not peek around it, with matching `px-4` so the
	  back control and title stay aligned with the in-flow header. The shadow is
	  bottom-only (`0 8px 8px -8px`): a normal drop shadow would bloom out of the
	  sides and the top and read as a panel sliding over the page.
	- **The offset comes from `--mb-header-h`**, which `AppShell` publishes. The
	  bar cannot know how tall the app header above it is, and it must not cover
	  the loading bar underneath it — hence `z-10` against the shell's `z-20`.
	- **Both back controls exist while collapsed**, the compact one first in the
	  DOM. Tabbing forward reaches the visible one; going on to the scrolled-off
	  original scrolls the page back to it, which expands the header and makes
	  the compact copy inert again. `inert` is what keeps the hidden state out of
	  the tab order and out of the a11y tree at the same time.
-->
<script>
	import BackButton from '../atoms/BackButton.svelte';

	/**
	 * @type {{
	 *   title?: string,
	 *   subtitle?: string,
	 *   backLabel?: string,
	 *   backAriaLabel?: string,
	 *   href?: string,
	 *   onback?: (event: MouseEvent) => void,
	 *   sticky?: boolean,
	 *   className?: string
	 * }}
	 */
	let {
		title = '',
		subtitle = '',
		backLabel = '',
		backAriaLabel = '',
		href = '',
		onback = undefined,
		sticky = true,
		className = ''
	} = $props();

	// Only reached when the host is not an AppShell (or an older one): the
	// shell's header is h-14, so this is the same 56px it publishes.
	const FALLBACK_HEADER_OFFSET = 56;

	// One name for one action, so the button does not get renamed halfway down
	// the page. The pill's visible label names it while it has one; the compact
	// circle has no text and falls back to this.
	const backName = $derived(backAriaLabel || backLabel || 'Go back');

	let collapsed = $state(false);
	/** @type {HTMLElement | undefined} */
	let sentinel = $state(undefined);

	$effect(() => {
		if (!sticky || !sentinel) return;

		const declared = parseFloat(getComputedStyle(sentinel).getPropertyValue('--mb-header-h'));
		const offset = Number.isFinite(declared) ? declared : FALLBACK_HEADER_OFFSET;

		const observer = new IntersectionObserver(
			([entry]) => {
				// Not intersecting also covers "scrolled off the bottom", which is
				// why the direction is checked rather than trusted.
				collapsed = !entry.isIntersecting && entry.boundingClientRect.top < offset;
			},
			{ rootMargin: `-${offset}px 0px 0px 0px` }
		);
		observer.observe(sentinel);
		return () => observer.disconnect();
	});
</script>

<!-- The bar is a *sibling* of the header block, not a child of it, and that is
     load-bearing: `position: sticky` is confined to its parent's box, and a
     wrapper around a hundred-pixel header would let the bar travel a hundred
     pixels and then scroll away with it. Out here its containing block is the
     page column, which is as tall as the page. -->
{#if sticky}
	<div class="sticky top-[var(--mb-header-h,56px)] z-10 h-0">
		<!-- Still the page, not a card: no rounding, no blur, opaque page
		     background. `-mx-4` / `px-4` make the paint a little wider than the
		     column so Island `shadow-lg` is covered rather than peeking around
		     the bar, without shifting the back control or title. The shadow uses
		     a negative spread equal to its blur so it only lands under the bar,
		     not out of the sides or the top. -->
		<div
			inert={!collapsed}
			class="-mx-4 flex h-12 items-center gap-1 bg-neutral-100 px-4 shadow-[0_8px_8px_-8px_rgb(0_0_0_/_0.15)] transition-opacity duration-200 motion-reduce:transition-none dark:bg-zinc-750 {collapsed
				? 'opacity-100'
				: 'opacity-0'}"
		>
			<BackButton {href} onclick={onback} ariaLabel={backName} />
			<!-- A second rendering of the same heading, not a second heading: the
			     real `<h1>` is still on the page, just scrolled past. -->
			<span
				aria-hidden="true"
				class="min-w-0 flex-1 truncate text-base font-bold text-gray-700 sm:text-lg dark:text-gray-200"
			>
				{title}
			</span>
		</div>
	</div>
{/if}

<div class={className}>
	<!-- `flex` keeps the pill its own width and parks it on the start edge,
	     which follows `dir` — RTL needs no second rule. It takes a row of its
	     own because a pill and a 3xl heading fight over one line. -->
	<div class="flex">
		<BackButton {href} onclick={onback} label={backLabel} ariaLabel={backName} />
	</div>
	<h1 class="mt-3 truncate text-xl font-bold text-gray-700 sm:text-3xl dark:text-gray-200">
		{title}
	</h1>
	{#if subtitle}
		<p class="truncate text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
	{/if}

	<!-- The trigger line. Zero height, at the bottom of the block it watches. -->
	<div bind:this={sentinel} aria-hidden="true"></div>
</div>
