<script>
	import { Check, Minus } from '@lucide/svelte';
	import FieldError from './FieldError.svelte';
	import { firstError } from '../../utils/fieldError.js';

	/**
	 * Custom Checkbox component with Lucide icons
	 * Supports checked, unchecked, and indeterminate states
	 */
	let {
		checked = false,
		indeterminate = false,
		disabled = false,
		ariaLabel = '',
		error = undefined,
		invalid = undefined,
		describedBy = undefined,
		onclick = () => {}
	} = $props();

	const uid = $props.id();
	const errorId = `checkbox-error-${uid}`;
	const message = $derived(firstError(error));
	const isInvalid = $derived(Boolean(invalid) || Boolean(message));
	const combinedDescribedBy = $derived(
		[describedBy, message ? errorId : undefined].filter(Boolean).join(' ') || undefined
	);
</script>

<div class="inline-flex flex-col items-start gap-y-1">
	<label
		class="relative inline-flex cursor-pointer items-center {disabled
			? 'cursor-default opacity-50'
			: ''}"
	>
		<!-- Hidden native checkbox for accessibility -->
		<input
			type="checkbox"
			{checked}
			{disabled}
			aria-label={ariaLabel || undefined}
			aria-invalid={isInvalid || undefined}
			aria-describedby={combinedDescribedBy}
			onclick={(e) => {
				if (!disabled) {
					onclick(e);
				}
			}}
			class="peer absolute h-0 w-0 opacity-0"
		/>
		<!-- Custom checkbox visual -->
		<div
			class="flex h-5 w-5 items-center justify-center rounded border transition-colors
			{checked || indeterminate
				? 'border-azure-600 bg-azure-600 dark:border-azure-500 dark:bg-azure-500'
				: isInvalid
					? 'border-red-alt-500 bg-white dark:border-red-alt-400 dark:bg-zinc-800'
					: 'border-gray-300 bg-white hover:border-azure-500 dark:border-gray-600 dark:bg-zinc-800 dark:hover:border-azure-300'}"
		>
			{#if checked && !indeterminate}
				<Check size={14} strokeWidth={3} class="text-white" />
			{:else if indeterminate}
				<Minus size={14} strokeWidth={3} class="text-white" />
			{/if}
		</div>
	</label>
	{#if message}
		<FieldError id={errorId} {message} />
	{/if}
</div>
