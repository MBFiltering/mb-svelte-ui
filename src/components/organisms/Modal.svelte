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
		ariaLabel = '', // Names the dialog for screen readers — pass the modal's own title
		closeLabel = 'Close modal', // aria-label/title for the close button
		children = undefined
	} = $props();

	// Swipe-to-dismiss state (mobile bottom-sheet)
	let dragY = $state(0);
	let isDragging = $state(false);
	let dismissing = $state(false);
	let modalHeight = $state(0);

	// Focus management. `aria-modal="true"` tells assistive tech the rest of the
	// page is inert, so the dialog has to actually hold focus or the user is left
	// focused on something their screen reader has just hidden.
	let dialogEl = $state(null);
	/** @type {HTMLElement | null} */
	let returnFocusTo = null;

	const FOCUSABLE =
		'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

	/** Focusable children, in tab order, skipping anything hidden. */
	function focusableItems() {
		if (!dialogEl) return [];
		return Array.from(dialogEl.querySelectorAll(FOCUSABLE)).filter(
			(el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
		);
	}

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

	// Handle escape key, and keep Tab inside the dialog.
	function handleKeydown(event) {
		if (!isOpen || dismissing) return;
		if (closeOnEscape && event.key === 'Escape') {
			onClose();
			return;
		}
		if (event.key !== 'Tab' || !dialogEl) return;

		const items = focusableItems();
		if (items.length === 0) {
			// Nothing to land on — keep focus on the dialog itself rather than
			// letting Tab escape to the page behind the backdrop.
			event.preventDefault();
			dialogEl.focus();
			return;
		}

		const first = items[0];
		const last = items[items.length - 1];
		const active = document.activeElement;

		// Wrap at both ends, and pull focus back in if it has somehow got outside.
		if (event.shiftKey && (active === first || active === dialogEl)) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		} else if (!dialogEl.contains(active)) {
			event.preventDefault();
			first.focus();
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

	// Move focus in on open and put it back on close. Several call sites focus
	// their own search input on open; that runs after this and wins, which is the
	// behaviour we want — this only guarantees focus lands *somewhere* inside.
	$effect(() => {
		if (!isOpen) return;

		returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;

		// One frame, so the children the trap needs to find are actually rendered.
		const frame = requestAnimationFrame(() => {
			if (!dialogEl) return;
			if (dialogEl.contains(document.activeElement)) return;
			const items = focusableItems();
			(items[0] ?? dialogEl).focus();
		});

		return () => {
			cancelAnimationFrame(frame);
			// Only take focus back if the dialog still owns it — if something else
			// has deliberately moved focus on close, don't fight it.
			if (!dialogEl || dialogEl.contains(document.activeElement) || document.activeElement === document.body) {
				returnFocusTo?.focus();
			}
			returnFocusTo = null;
		};
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
			bind:this={dialogEl}
			bind:clientHeight={modalHeight}
			role="dialog"
			aria-modal="true"
			aria-label={ariaLabel || undefined}
			tabindex="-1"
			class="relative max-h-[90dvh] w-full max-w-3xl focus:outline-none {overflowVisible
				? 'overflow-visible'
				: 'overflow-auto'} {isDragging ? '' : 'transition-transform duration-200'}"
			style="transform: translateY({dragY}px)"
		>
			<!-- Close Button -->
			{#if showCloseButton}
				<button
					type="button"
					onclick={onClose}
					class="g2 hidden sm:block sm:absolute top-1 rtl:left-1 ltr:right-1 z-10 cursor-pointer rounded-lg p-2 text-gray-700 transition-colors hover:bg-neutral-100 hover:text-gray-900 sm:top-2 ltr:sm:right-2 rtl:sm:left-2 dark:text-gray-200 dark:hover:bg-zinc-750 dark:hover:text-white"
					aria-label={closeLabel}
					title={closeLabel}
				>
					<X size={20} aria-hidden="true" />
				</button>
			{/if}
			<!-- Bottom Sheet Handle (swipe to dismiss on mobile) -->
			<!-- Pointer-only affordance: Escape and the close button already cover
			     keyboard and assistive tech, so it stays out of the a11y tree. -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				aria-hidden="true"
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
