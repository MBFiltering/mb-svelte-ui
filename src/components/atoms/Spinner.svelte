<script>
	import { LoaderCircle } from '@lucide/svelte';

	let { size = 32, color = 'text-gray-500', className = '' } = $props();
</script>

<div class="flex items-center justify-center py-8 {className}">
	<LoaderCircle {size} class="animate-spin {color}" />
</div>
