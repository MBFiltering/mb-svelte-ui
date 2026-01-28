<script>
	import { ExternalLink } from '@lucide/svelte';

	/**
	 * External link with icon component
	 * Displays a link with an ExternalLink icon that opens in a new tab
	 */
	let {
		href = '',
		text = '',
		className = 'text-azure-700 dark:text-azure-500',
		iconSize = 18
	} = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="inline-flex items-center gap-2 hover:underline {className}"
>
	<ExternalLink size={iconSize} />
	<span>{text}</span>
</a>
