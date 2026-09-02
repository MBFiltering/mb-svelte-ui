<script>
	import { CircleAlert } from '@lucide/svelte';

	/**
	 * The message under a field. Colour is not the only signal (1.4.1): the icon
	 * sits next to the text, and `role="alert"` announces it when it appears.
	 */
	let { id = undefined, message = '', className = '' } = $props();
</script>

{#if message}
	<p
		{id}
		role="alert"
		class="flex items-center gap-x-1 text-xs text-red-alt-600 dark:text-red-alt-400 {className}"
	>
		<CircleAlert size={13} class="shrink-0" aria-hidden="true" />
		{message}
	</p>
{/if}
