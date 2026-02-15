<script>
	import { Eye, EyeClosed } from '@lucide/svelte';
	import CircleButton from './CircleButton.svelte';

	/**
	 * Visibility toggle component
	 * Shows/hides sensitive content with an eye icon button
	 */
	let {
		visible = $bindable(false),
		labelShow = 'Show',
		labelHide = 'Hide',
		soundOn = null,
		soundOff = null
	} = $props();

	function toggle() {
		visible = !visible;
	}
</script>

<CircleButton
	onclick={toggle}
	sound={visible ? soundOff : soundOn}
	icon={visible ? EyeClosed : Eye}
	iconSize={14}
	size="sm"
	color="ghost2"
	title={visible ? labelHide : labelShow}
	className="[&>svg]:stroke-2"
/>
