<script>
	import Clipboard from './Clipboard.svelte';

	let { data } = $props();

	let text = $derived(JSON.stringify(data, null, 2));
</script>

<div class="relative">
	<div class="absolute top-1 right-1">
		<Clipboard content={text} title="Copy JSON" />
	</div>
	<pre
		class="overflow-auto rounded bg-gray-100 p-2 pr-8 text-xs text-gray-900 dark:bg-gray-800 dark:text-gray-50">{text}</pre>
</div>
