<script>
	import { Check, Copy } from '@lucide/svelte';

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

<button
	type="button"
	onclick={handleCopy}
	class="inline-flex cursor-pointer items-center justify-center rounded-full p-1.5 text-gray-900/50 transition-colors hover:bg-gray-900/10 dark:text-gray-50/50 dark:hover:bg-white/10"
	aria-label={ariaLabel}
	{title}
>
	{#if copied}
		<Check size="14" strokeWidth="2" />
	{:else}
		<Copy size="14" strokeWidth="2" />
	{/if}
</button>

{#if children}
	<span
		onclick={handleCopy}
		class="inline cursor-pointer border-none bg-transparent p-0"
		aria-label="Copy content"
	>
		{@render children()}
	</span>
{/if}
