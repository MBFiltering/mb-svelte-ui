/**
 * Close-on-outside-interaction wiring for popovers, dropdowns and menus.
 *
 * Call it from inside an `$effect` that only runs while the surface is open,
 * and return its result as the effect's teardown:
 *
 * ```js
 * $effect(() => {
 *   if (!isOpen) return;
 *   return dismissOnOutside(() => element, () => (isOpen = false));
 * });
 * ```
 *
 * @param {() => Element | null | undefined} getElement Returns the surface's root node
 * @param {() => void} close Called on an outside pointerdown or on Escape
 * @returns {() => void} Teardown that removes both listeners
 */
export function dismissOnOutside(getElement, close) {
	const handlePointerDown = (event) => {
		if (!getElement()?.contains(event.target)) close();
	};

	const handleKeydown = (event) => {
		if (event.key === 'Escape') close();
	};

	document.addEventListener('pointerdown', handlePointerDown);
	document.addEventListener('keydown', handleKeydown);

	return () => {
		document.removeEventListener('pointerdown', handlePointerDown);
		document.removeEventListener('keydown', handleKeydown);
	};
}
