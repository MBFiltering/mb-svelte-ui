<script>
	import { toast } from '../../utils/toastStore.js';
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
		onUpdate = () => {}
	} = $props();

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
			toast.info('No changes to save');
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

<div class="mb-1 flex w-full items-start justify-between gap-1 text-sm font-medium text-gray-700">
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
			<p class="flex-1 text-sm whitespace-pre-wrap {value ? 'text-gray-700' : 'text-gray-900/50'}">
				{value || `No ${label.toLowerCase()} added yet.`}
			</p>
		{:else}
			<p class="flex-1 text-sm {value ? 'text-gray-700' : 'text-gray-900/50'}">
				{value || `No ${label.toLowerCase()} added yet.`}
			</p>
		{/if}
	</div>

	{#if isEditing}
		<div class="flex gap-1">
			<button
				onclick={save}
				disabled={isSaving}
				title={isSaving ? 'Saving...' : 'Save'}
				class="cursor-pointer rounded-full bg-azure-500 p-2 text-white transition-colors hover:bg-azure-900 disabled:cursor-default disabled:opacity-50"
			>
				<Check size="18" />
			</button>
			<button
				onclick={cancelEditing}
				disabled={isSaving}
				title="Cancel"
				class="cursor-pointer rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-900/10 disabled:cursor-default disabled:opacity-50"
			>
				<X size="18" />
			</button>
		</div>
	{:else}
		<div class="flex items-start gap-1">
			<button
				onclick={startEditing}
				title="Edit"
				class="cursor-pointer rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-900/10"
			>
				<Pencil size="18" />
			</button>
		</div>
	{/if}
</div>
