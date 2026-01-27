<script>
	import { ArrowLeft } from '@lucide/svelte';

	/**
	 * Navigate back to previous page, or dashboard if no history
	 */
	function goBack() {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			window.location.href = '/dashboard';
		}
	}
</script>

<button
	onclick={goBack}
	title="Go back"
	class="cursor-pointer rounded-full p-2.5 text-gray-700 transition-colors hover:bg-gray-900/10"
>
	<ArrowLeft size="20" strokeWidth="2" />
</button>
