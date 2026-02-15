<script>
	import { onMount } from 'svelte';
	import { CheckCircle, XCircle, Info, AlertTriangle } from '@lucide/svelte';

	// Props - Svelte 5 style
	let { message = '', type = 'success', duration = 3000, onClose = () => {} } = $props();

	let visible = $state(false);
	let mounted = $state(false);

	// Type-specific styles
	const typeStyles = {
		success: 'bg-green-alt-500 text-white',
		error: 'bg-red-alt-500 text-white',
		info: 'bg-azure-700 text-white',
		warning: 'bg-yellow-500 text-white'
	};

	// Type-specific Lucide icons
	const typeIcons = {
		success: CheckCircle,
		error: XCircle,
		info: Info,
		warning: AlertTriangle
	};

	const IconComponent = typeIcons[type];

	onMount(() => {
		// Trigger mount state first
		mounted = true;
		// Then trigger visible state for animation
		setTimeout(() => {
			visible = true;
		}, 10);

		// Auto-dismiss if duration is set
		if (duration > 0) {
			setTimeout(() => {
				close();
			}, duration);
		}
	});

	function close() {
		visible = false;
		setTimeout(() => {
			onClose();
		}, 300); // Wait for fade-out animation
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all duration-300 ease-out {typeStyles[
		type
	]} {visible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-95 opacity-0'}"
	role="alert"
	onclick={close}
>
	<!-- Icon -->
	<IconComponent size={20} class="shrink-0" />

	<!-- Message -->
	<div class="flex-1 text-sm font-medium">{message}</div>
</div>
