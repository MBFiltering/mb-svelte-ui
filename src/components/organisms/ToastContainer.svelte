<script>
	import Toast from '../atoms/Toast.svelte';
	import toasts, { removeToast } from '../../utils/toastStore.js';

	/**
	 * Optional sounds config — map toast types to sound sources.
	 * @type {{ success?: *, error?: *, info?: *, warning?: * }}
	 */
	let { sounds = {} } = $props();
</script>

<!-- Toast Container -->
<div class="fixed top-4 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
	{#each $toasts as toast (toast.id)}
		<Toast
			message={toast.message}
			type={toast.type}
			duration={toast.duration}
			sound={sounds[toast.type] ?? null}
			onClose={() => removeToast(toast.id)}
		/>
	{/each}
</div>
