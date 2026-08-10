<script>
	import Toast from '../atoms/Toast.svelte';
	import toasts, { removeToast } from '../../utils/toastStore.js';

	// Accessible name for each toast's dismiss button. Passed once here rather
	// than per `toast.success(...)` call, since the store carries only the message.
	let { dismissLabel = 'Dismiss' } = $props();
</script>

<!-- Toast Container -->
<!-- <div class="fixed top-4 left-1/2 z-60 flex -translate-x-1/2 flex-col items-center gap-2"> -->
<div class="fixed top-4 z-60 flex justify-center flex-col items-center gap-2 px-4 w-full">
	{#each $toasts as toast (toast.id)}
		<Toast
			message={toast.message}
			type={toast.type}
			duration={toast.duration}
			{dismissLabel}
			onClose={() => removeToast(toast.id)}
		/>
	{/each}
</div>
