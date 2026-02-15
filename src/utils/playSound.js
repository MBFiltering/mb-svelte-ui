/**
 * Play a UI sound.
 *
 * @param {string | HTMLAudioElement | (() => void) | null | undefined} sound
 */
export function playSound(sound) {
	if (!sound) return;

	try {
		if (typeof sound === 'function') {
			sound();
			return;
		}

		if (typeof Audio === 'undefined') return;

		if (typeof HTMLAudioElement !== 'undefined' && sound instanceof HTMLAudioElement) {
			sound.currentTime = 0;
			sound.play();
			return;
		}

		if (typeof sound === 'string') {
			const audio = new Audio(sound);
			audio.play();
		}
	} catch {
		// Intentionally ignore sound playback errors
	}
}
