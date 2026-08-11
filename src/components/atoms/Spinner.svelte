<!--
	Spinner Component

	A standalone wait indicator. By default it is a *block* — it centres itself
	and reserves `py-8`, which is what a page or panel waiting on its first load
	wants.

	Pass `block={false}` where the spinner sits inline beside other content (a
	label in a flex row, a cell in a table). The padding is the whole difference:
	dropped unchanged into a fixed-height row it is 64px of vertical padding
	fighting the row for space.

	Inside a button, reach for `ControlButton`/`CircleButton`'s own `loading`
	prop rather than this component — they overlay the spinner without resizing.
-->
<script>
	import { LoaderCircle } from '@lucide/svelte';

	let { size = 32, color = 'text-gray-500', block = true, className = '' } = $props();
</script>

<div class="flex items-center justify-center {block ? 'py-8' : ''} {className}">
	<LoaderCircle {size} class="animate-spin {color}" />
</div>
