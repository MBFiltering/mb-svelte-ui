<script>
	import { X } from '@lucide/svelte';

	// Props - Svelte 5 style
	let {
		isOpen = false,
		onClose = () => {},
		showCloseButton = true,
		closeOnBackdrop = true,
		closeOnEscape = true,
		verticalAlign = 'center', // New prop: 'top', 'center', or 'bottom'
		children
	} = $props();

	// Computed class for vertical alignment
	let itemsClass = $derived(() => {
		switch (verticalAlign) {
			case 'top':
				return 'items-start';
			case 'bottom':
				return 'items-end';
			case 'center':
			default:
				return 'items-center';
		}
	});

	// Handle backdrop click
	function handleBackdropClick(event) {
		if (closeOnBackdrop && event.target === event.currentTarget) {
			onClose();
		}
	}

	// Handle escape key
	function handleKeydown(event) {
		if (closeOnEscape && event.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- Modal Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex {itemsClass} justify-center bg-neutral-900/40 p-4 backdrop-blur-[1px] sm:p-6 md:p-8"
		onclick={handleBackdropClick}
	>
		<!-- Modal Content Container -->
		<div class="relative max-h-[90dvh] w-full max-w-3xl overflow-auto">
			<!-- Close Button -->
			{#if showCloseButton}
				<button
					type="button"
					onclick={onClose}
					class="absolute top-1 right-1 z-10 cursor-pointer rounded-lg p-2 text-gray-700 transition-colors hover:bg-neutral-100 hover:text-gray-900 sm:top-2 sm:right-2 dark:text-gray-200 dark:hover:bg-zinc-800 dark:hover:text-white"
					aria-label="Close modal"
				>
					<X size={20} />
				</button>
			{/if}

			<!-- Slot Content -->
			{@render children?.()}
		</div>
	</div>
{/if}
