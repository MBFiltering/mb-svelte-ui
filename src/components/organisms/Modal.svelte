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
		overflowVisible = false,
		children
	} = $props();

	// Swipe-to-dismiss state (mobile bottom-sheet)
	let dragY = $state(0);
	let isDragging = $state(false);
	let dismissing = $state(false);
	let modalHeight = $state(0);

	let startY = 0;
	let lastY = 0;
	let lastT = 0;
	let velocity = 0; // px/ms, positive = downward

	const DISMISS_THRESHOLD_RATIO = 0.28; // fraction of modal height
	const DISMISS_VELOCITY = 0.55; // px/ms flick speed
	const SNAP_MS = 200; // matches transition-transform duration

	// Handle backdrop click
	function handleBackdropClick(event) {
		if (dismissing) return;
		if (closeOnBackdrop && event.target === event.currentTarget) {
			onClose();
		}
	}

	// Handle escape key
	function handleKeydown(event) {
		if (!isOpen || dismissing) return;
		if (closeOnEscape && event.key === 'Escape') {
			onClose();
		}
	}

	// Pointer handlers cover both touch and mouse. Pointer capture keeps the
	// drag alive even when the finger/cursor slides off the small handle.
	function handlePointerDown(event) {
		if (dismissing) return;
		if (event.pointerType === 'mouse' && event.button !== 0) return;
		isDragging = true;
		startY = event.clientY;
		lastY = event.clientY;
		lastT = performance.now();
		velocity = 0;
		try {
			event.currentTarget.setPointerCapture(event.pointerId);
		} catch {
			/* ignore */
		}
	}

	function handlePointerMove(event) {
		if (!isDragging || dismissing) return;
		const y = event.clientY;
		const now = performance.now();
		// Only allow dragging down (positive diff)
		dragY = Math.max(0, y - startY);
		const dt = now - lastT;
		if (dt > 0) velocity = (y - lastY) / dt;
		lastY = y;
		lastT = now;
	}

	function handlePointerUp() {
		if (!isDragging || dismissing) return;
		isDragging = false;

		const shouldDismiss =
			dragY >= modalHeight * DISMISS_THRESHOLD_RATIO || velocity >= DISMISS_VELOCITY;
		if (shouldDismiss) {
			// Animate the sheet off-screen, then close once it's out of view.
			dismissing = true;
			dragY = modalHeight + 48;
			setTimeout(onClose, SNAP_MS);
		} else {
			// Snap back to rest.
			dragY = 0;
		}
	}

	// Reset drag state whenever the modal is closed (externally or by dismiss).
	$effect(() => {
		if (!isOpen) {
			dragY = 0;
			isDragging = false;
			dismissing = false;
		}
	});
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
			class="relative max-h-[90dvh] w-full max-w-3xl {overflowVisible
				? 'overflow-visible'
				: 'overflow-auto'} {isDragging ? '' : 'transition-transform duration-200'}"
			style="transform: translateY({dragY}px)"
		>
			<!-- Close Button -->
			{#if showCloseButton}
				<button
					type="button"
					onclick={onClose}
					class="hidden sm:block sm:absolute top-1 rtl:left-1 ltr:right-1 z-10 cursor-pointer rounded-lg p-2 text-gray-700 transition-colors hover:bg-neutral-100 hover:text-gray-900 sm:top-2 ltr:sm:right-2 rtl:sm:left-2 dark:text-gray-200 dark:hover:bg-zinc-750 dark:hover:text-white"
					aria-label="Close modal"
				>
					<X size={20} />
				</button>
			{/if}
			<!-- Bottom Sheet Handle (swipe to dismiss on mobile) -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="absolute sm:hidden w-full h-8 top-0 left-0 flex pt-2 justify-center cursor-grab active:cursor-grabbing touch-none select-none"
				onpointerdown={handlePointerDown}
				onpointermove={handlePointerMove}
				onpointerup={handlePointerUp}
				onpointercancel={handlePointerUp}
			>
				<div class="bg-gray-600 dark:bg-gray-300 rounded-full w-1/4 h-1"></div>
			</div>

			<!-- Slot Content -->
			{@render children?.()}
		</div>
	</div>
{/if}
