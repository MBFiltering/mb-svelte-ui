<script>
	let { data } = $props();
</script>

<pre
	class="overflow-auto rounded bg-gray-100 p-2 text-xs text-gray-900 dark:bg-gray-800 dark:text-white">{JSON.stringify(
		data,
		null,
		2
	)}</pre>
