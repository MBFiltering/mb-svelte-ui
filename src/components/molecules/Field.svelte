<!--
	Label + hint + inline error wrapper for any control (select, checkbox row,
	TextInput that has no label of its own).

	The error sits under the control, never beside the label. Superforms arrays
	are reduced to the first message. The error's id is handed to children so
	the control can point at it with aria-describedby.
-->
<script>
	import FieldError from '../atoms/FieldError.svelte';
	import { firstError } from '../../utils/fieldError.js';

	let {
		label = '',
		error = undefined,
		hint = '',
		// Alias used by the portals' previous local Field.
		textInfo = '',
		children
	} = $props();

	const uid = $props.id();
	const errorId = `field-error-${uid}`;
	const message = $derived(firstError(error));
	const helper = $derived(hint || textInfo);
</script>

<div class="w-full">
	<div class="flex w-full flex-col gap-y-2">
		{#if label}
			<span class="text-[14px] text-gray-700 dark:text-gray-200">{label}</span>
		{/if}
		<div class="relative w-full">
			{@render children?.(message ? errorId : undefined)}
		</div>
		{#if message}
			<FieldError id={errorId} {message} />
		{:else if helper}
			<span class="text-xs text-gray-600 dark:text-gray-300">{helper}</span>
		{/if}
	</div>
</div>
