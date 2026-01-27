<script>
	import { Eye, EyeClosed } from '@lucide/svelte';

	/**
	 * Visibility toggle component
	 * Shows/hides sensitive content with an eye icon button
	 */
	let { visible = $bindable(false), labelShow = 'Show', labelHide = 'Hide' } = $props();

	function toggle() {
		visible = !visible;
	}
</script>

<button
	type="button"
	onclick={toggle}
	class="inline-flex cursor-pointer items-center justify-center rounded-full p-1.5 text-gray-900/50 transition-colors hover:bg-gray-900/10"
	aria-label={visible ? labelHide : labelShow}
	title={visible ? labelHide : labelShow}
>
	{#if visible}
		<EyeClosed size="14" strokeWidth="2" />
	{:else}
		<Eye size="14" strokeWidth="2" />
	{/if}
</button>
