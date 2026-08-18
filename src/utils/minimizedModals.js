import { writable } from 'svelte/store';

/**
 * The ids of every currently minimized `Modal`, in the order they were
 * minimized.
 *
 * Minimized modals stack in the bottom corner of the viewport, and each one is
 * an independent `Modal` instance that knows nothing about the others — so the
 * order has to live outside all of them. A modal's position in this array is
 * its position in the stack; dropping out of the middle of it slides the ones
 * above down, which is why the chips animate their offset.
 *
 * @type {import('svelte/store').Writable<string[]>}
 */
const minimizedModals = writable([]);

/**
 * Add a modal to the bottom of the stack. Idempotent.
 * @param {string} id
 */
export function registerMinimized(id) {
	minimizedModals.update((ids) => (ids.includes(id) ? ids : [...ids, id]));
}

/**
 * Remove a modal from the stack (on restore, on close, or on destroy).
 * @param {string} id
 */
export function unregisterMinimized(id) {
	minimizedModals.update((ids) => ids.filter((existing) => existing !== id));
}

export default minimizedModals;
