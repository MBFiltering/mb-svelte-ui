import { writable } from 'svelte/store';

// Toast store
const toasts = writable([]);

let toastId = 0;

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - Toast type: 'success', 'error', 'info', 'warning'
 * @param {number} duration - Auto-dismiss duration in ms (default: 3000, 0 = no auto-dismiss)
 */
export function showToast(message, type = 'success', duration = 3000) {
	const id = toastId++;
	const toast = { id, message, type, duration };

	toasts.update((all) => [...all, toast]);

	// Auto-remove after duration if not 0
	if (duration > 0) {
		setTimeout(() => {
			removeToast(id);
		}, duration + 300); // Add 300ms for fade-out animation
	}
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
 */
export const toast = {
	success: (message, duration = 3000) => showToast(message, 'success', duration),
	error: (message, duration = 5000) => showToast(message, 'error', duration),
	info: (message, duration = 3000) => showToast(message, 'info', duration),
	warning: (message, duration = 4000) => showToast(message, 'warning', duration)
};

export default toasts;
