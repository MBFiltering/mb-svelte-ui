<script>
	import { onMount } from 'svelte';

	/**
	 * SvgIcon Component
	 * Inlines custom SVG icons from the /static/icons directory
	 * Allows full CSS control including colors via currentColor
	 *
	 * @param {string} name - Icon filename (without .svg extension)
	 * @param {string} size - Tailwind size class (e.g., 'w-6 h-6', 'w-4 h-4')
	 * @param {string} className - Additional CSS classes
	 */
	let { name, size = 'w-6 h-6', className = '' } = $props();

	let svgContent = $state('');
	let loading = $state(true);
	let error = $state(false);

	// Icons are first-party assets served from /icons. Restrict the name to a
	// safe slug so a caller-supplied value can never redirect the fetch to an
	// arbitrary path (traversal) or feed the {@html} sink from an unexpected URL.
	const SAFE_ICON_NAME = /^[a-zA-Z0-9_-]+$/;

	onMount(async () => {
		if (!name || !SAFE_ICON_NAME.test(name)) {
			console.error(`Invalid SVG icon name: ${name}`);
			error = true;
			loading = false;
			return;
		}

		try {
			const response = await fetch(`/icons/${name}.svg`);
			if (!response.ok) {
				throw new Error('SVG not found');
			}
			const text = await response.text();
			svgContent = text;
			loading = false;
		} catch (err) {
			console.error(`Error loading SVG icon: ${name}`, err);
			error = true;
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="{size} {className}"></div>
{:else if error}
	<div class="{size} {className} rounded bg-gray-100"></div>
{:else}
	<div class="{size} {className} inline-block">
		{@html svgContent}
	</div>
{/if}

<style>
	div :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
