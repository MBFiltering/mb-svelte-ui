<script>
	import { X } from '@lucide/svelte';

	// Props - Svelte 5 style
	let {
		isOpen = false,
		onClose = () => {},
		showCloseButton = true,
		closeOnBackdrop = true,
		closeOnEscape = true,
		verticalAlign = 'center', // 'top', 'center', or 'bottom'
		children
	} = $props();

	// Swipe-to-dismiss state
	let dragY = $state(0);
	let isDragging = $state(false);
	let startY = 0;
	let modalHeight = 0;

	const DISMISS_THRESHOLD_RATIO = 0.4; // 40% of modal height

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

	// Touch handlers for swipe-to-dismiss
	function handleTouchStart(event) {
		startY = event.touches[0].clientY;
		isDragging = true;
	}

	function handleTouchMove(event) {
		if (!isDragging) return;
		const currentY = event.touches[0].clientY;
		const diff = currentY - startY;
		// Only allow dragging down (positive diff)
		dragY = Math.max(0, diff);
	}

	function handleTouchEnd() {
		if (!isDragging) return;
		isDragging = false;

		const threshold = modalHeight * DISMISS_THRESHOLD_RATIO;
		if (dragY >= threshold) {
			onClose();
		}
		dragY = 0;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- Modal Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex {verticalAlign === 'top'
			? 'items-end sm:items-start'
			: verticalAlign === 'bottom'
				? 'items-end'
				: 'items-end sm:items-center'} justify-center bg-neutral-900/40 sm:p-6 md:p-8 dark:bg-neutral-900/60"
		onclick={handleBackdropClick}
	>
		<!-- Modal Content Container -->
		<div
			bind:clientHeight={modalHeight}
			class="relative max-h-[90dvh] w-full max-w-3xl overflow-auto {isDragging ? '' : 'transition-transform duration-200'}"
			style="transform: translateY({dragY}px)"
		>
			<!-- Close Button -->
			{#if showCloseButton}
				<button
					type="button"
					onclick={onClose}
					class="hidden sm:absolute top-1 rtl:left-1 ltr:right-1 z-10 cursor-pointer rounded-lg p-2 text-gray-700 transition-colors hover:bg-neutral-100 hover:text-gray-900 sm:top-2 ltr:sm:right-2 rtl:sm:left-2 dark:text-gray-200 dark:hover:bg-zinc-750 dark:hover:text-white"
					aria-label="Close modal"
				>
					<X size={20} />
				</button>
			{/if}
			<!-- Bottom Sheet Handle (swipe to dismiss on mobile) -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="absolute sm:hidden w-full h-8 top-0 left-0 flex pt-2 justify-center cursor-grab touch-none"
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
				ontouchend={handleTouchEnd}
			>
				<div class="bg-gray-600 dark:bg-gray-300 rounded-full w-1/4 h-1"></div>
			</div>

			<!-- Slot Content -->
			{@render children?.()}
		</div>
	</div>
{/if}
