<script>
	import { Check, Copy } from '@lucide/svelte';
	import CircleButton from './CircleButton.svelte';

	// Props - Svelte 5 style
	let { content = '', title = 'Copy to clipboard', ariaLabel = 'Copy to clipboard', children } = $props();

	let copied = $state(false);
	let timeout;

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(content);
			copied = true;

			// Clear any existing timeout
			if (timeout) {
				clearTimeout(timeout);
			}

			// Reset after 3 seconds
			timeout = setTimeout(() => {
				copied = false;
			}, 3000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<CircleButton
	onclick={handleCopy}
	icon={copied ? Check : Copy}
	iconSize={14}
	size="sm"
	color="ghost2"
	{title}
	className="[&>svg]:stroke-2"
/>

{#if children}
	<span
		onclick={handleCopy}
		class="inline cursor-pointer border-none bg-transparent p-0"
		aria-label="Copy content"
	>
		{@render children()}
	</span>
{/if}
