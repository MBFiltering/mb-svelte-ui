import { writable } from 'svelte/store';

// Toast store
const toasts = writable([]);

let toastId = 0;

/**
 * Show a toast notification
 *
 * Timing is owned by the Toast component, not by this store: a toast pauses its
 * own countdown while hovered or focused, so a timer here would remove it out
 * from under someone who is still reading it. The component calls `removeToast`
 * when its countdown actually finishes.
 *
 * @param {string} message - The message to display
 * @param {string} type - Toast type: 'success', 'error', 'info', 'warning'
 * @param {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 */
export function showToast(message, type = 'success', duration = 8000) {
	const id = toastId++;
	const toast = { id, message, type, duration };

	toasts.update((all) => [...all, toast]);
}

/**
 * Remove a toast by ID
 * @param {number} id - Toast ID to remove
 */
export function removeToast(id) {
	toasts.update((all) => all.filter((t) => t.id !== id));
}

/**
 * Convenience functions for different toast types
 *
 * 8s routine, 10s warnings, 30s errors. Hover/focus pauses the countdown
 * (that lives in Toast). Pass 0 to persist until dismissed.
 */
export const toast = {
	success: (message, duration = 8000) => showToast(message, 'success', duration),
	error: (message, duration = 30000) => showToast(message, 'error', duration),
	info: (message, duration = 8000) => showToast(message, 'info', duration),
	warning: (message, duration = 10000) => showToast(message, 'warning', duration)
};

export default toasts;
