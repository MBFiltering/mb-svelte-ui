<script>
	import { toast } from '../../utils/toastStore.js';
	import CircleButton from './CircleButton.svelte';
	import Clipboard from './Clipboard.svelte';
	import TextInput from './TextInput.svelte';
	import { Pencil, Check, X } from '@lucide/svelte';

	// Props - Svelte 5 style
	let {
		label = 'Field',
		hideLabel = false,
		value = '',
		placeholder = 'Enter value...',
		rows = 3,
		type = 'textarea', // 'textarea' or 'text'
		onSave = async () => {},
		onUpdate = () => {},
		// i18n props for button titles
		editTitle = 'Edit',
		saveTitle = 'Save',
		savingTitle = 'Saving...',
		cancelTitle = 'Cancel',
		noChangesMessage = 'No changes to save',
		emptyMessage = '' // Full message for empty state (overrides default)
	} = $props();

	// Compute the message to show when empty
	const emptyText = $derived(emptyMessage || `No ${label.toLowerCase()} added yet.`);

	let isEditing = $state(false);
	let currentValue = $state(value);
	let isSaving = $state(false);

	// Update currentValue when value prop changes
	$effect(() => {
		currentValue = value;
	});

	function startEditing() {
		isEditing = true;
	}

	function cancelEditing() {
		currentValue = value;
		isEditing = false;
	}

	async function save() {
		// Check if value actually changed
		if (currentValue === value) {
			toast.info(noChangesMessage);
			isEditing = false;
			return;
		}

		isSaving = true;

		try {
			const result = await onSave(currentValue);

			if (result?.error) {
				toast.error(result.error);
			} else if (result?.ok || result === true) {
				isEditing = false;
				// Notify parent of the update
				onUpdate(currentValue);
			} else {
				toast.error('Update failed');
			}
		} catch (error) {
			toast.error(`Failed to update ${label.toLowerCase()}`);
			console.error('Save error:', error);
		}

		isSaving = false;
	}
</script>

<div
	class="mb-1 flex w-full items-start justify-between gap-1 text-sm font-medium text-gray-700 dark:text-gray-200"
>
	<div class="mt-[0.4rem] flex w-full items-start gap-1">
		{#if !hideLabel}
			<span class="whitespace-nowrap">
				{label}:
			</span>
		{/if}
		{#if value && !isEditing}
			<Clipboard content={value} />
		{/if}
		{#if isEditing}
			<TextInput
				{type}
				bind:value={currentValue}
				disabled={isSaving}
				{rows}
				{placeholder}
				size="sm"
			/>
		{:else if type === 'textarea'}
			<p
				class="flex-1 text-sm whitespace-pre-wrap {value
					? 'text-gray-700 dark:text-gray-200'
					: 'text-gray-900/50 dark:text-gray-50/50'}"
			>
				{value || emptyText}
			</p>
		{:else}
			<p
				class="flex-1 text-sm {value
					? 'text-gray-700 dark:text-gray-200'
					: 'text-gray-900/50 dark:text-gray-50/50'}"
			>
				{value || emptyText}
			</p>
		{/if}
	</div>

	{#if isEditing}
		<div class="flex flex-col gap-1">
			<CircleButton onclick={cancelEditing} disabled={isSaving} title={cancelTitle} icon={X} />
			<CircleButton onclick={save} disabled={isSaving} title={isSaving ? savingTitle : saveTitle} color="azure" icon={Check} />
		</div>
	{:else}
		<div class="flex items-start gap-1">
			<CircleButton onclick={startEditing} title={editTitle} icon={Pencil} />
		</div>
	{/if}
</div>
