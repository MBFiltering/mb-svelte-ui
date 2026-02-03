<script>
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';

	/**
	 * @type {{ title?: string }}
	 */
	let { title = 'Go back' } = $props();

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
	{title}
	class="cursor-pointer rounded-full p-2.5 text-gray-700 transition-colors hover:bg-gray-900/10 dark:text-gray-200 dark:hover:bg-white/10"
>
	<ArrowLeft size="20" strokeWidth="2" class="rtl:hidden ltr:block" />
	<ArrowRight size="20" strokeWidth="2" class="ltr:hidden rtl:block" />
</button>
