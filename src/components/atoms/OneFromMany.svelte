<script>
	import { ChevronDown } from '@lucide/svelte';

	let {
		options = [], // Array of { value, label, color }
		selected = '',
		value = '', // Support both selected and value for backwards compatibility
		onChange = () => {}, // Primary callback
		onSelect = () => {}, // Backwards compatibility
		disabled = false
	} = $props();

	// Use value if selected is not provided (use ?? to handle false values correctly)
	const currentValue = $derived(selected ?? value);

	let selectRef = $state(null);

	// The first option is always shown
	const firstOption = $derived(options[0]);

	// Options for the dropdown (exclude first option)
	const dropdownOptions = $derived(options.slice(1));

	// Track the last selected dropdown option (for toggle behavior)
	// Initialize with current value if it's a dropdown option
	let lastDropdownSelection = $state(null);

	// Initialize lastDropdownSelection on first render if current value is a dropdown option
	$effect.pre(() => {
		if (lastDropdownSelection === null && dropdownOptions.length > 0) {
			const initialValue = selected ?? value;
			const isDropdownOption = dropdownOptions.some((opt) => opt.value === initialValue);
			if (isDropdownOption) {
				lastDropdownSelection = initialValue;
			}
		}
	});

	// Get the option to display in the dropdown button
	// Priority: lastDropdownSelection > currentValue (if in dropdown) > first dropdown option
	const displayedDropdownOption = $derived.by(() => {
		// If we have a remembered selection, use it
		if (lastDropdownSelection) {
			const remembered = dropdownOptions.find((opt) => opt.value === lastDropdownSelection);
			if (remembered) return remembered;
		}
		// Otherwise, if current value is a dropdown option, use it
		const current = dropdownOptions.find((opt) => opt.value === currentValue);
		if (current) return current;
		// Default to first dropdown option
		return dropdownOptions[0];
	});

	// Get the button color based on which option is selected
	function getButtonColor(option, isSelected) {
		if (!option) return 'bg-gray-100 dark:bg-zinc-750';
		// Show actual color only if selected, otherwise gray
		return isSelected
			? option.color || 'bg-gray-100 dark:bg-zinc-750'
			: 'bg-gray-100 dark:bg-zinc-750';
	}

	// Handle clicking the first option
	function handleFirstClick() {
		if (disabled) return;
		if (onChange) onChange(firstOption.value);
		if (onSelect) onSelect(firstOption.value);
	}

	// Handle clicking the second option button (toggle back to remembered selection)
	function handleSecondClick() {
		if (disabled) return;
		const targetValue = displayedDropdownOption?.value;
		lastDropdownSelection = targetValue; // Remember this selection
		if (onChange) onChange(targetValue);
		if (onSelect) onSelect(targetValue);
	}

	// Handle selecting from dropdown
	function handleDropdownSelect(event) {
		if (disabled) return;
		const selectedValue = event.target.value;
		lastDropdownSelection = selectedValue; // Remember this selection
		if (onChange) onChange(selectedValue);
		if (onSelect) onSelect(selectedValue);
	}
</script>

<div class="inline-flex items-center gap-0">
	<!-- First Option Button -->
	<button
		type="button"
		onclick={handleFirstClick}
		{disabled}
		class="cursor-pointer rounded-s-lg px-3 py-1.5 text-sm font-medium transition-all {getButtonColor(
			firstOption,
			currentValue === firstOption?.value
		)} {currentValue === firstOption?.value
			? 'text-white opacity-100'
			: 'text-gray-700 opacity-100 hover:opacity-80 dark:text-gray-200'} disabled:cursor-default disabled:opacity-40"
	>
		{firstOption?.label || 'Option 1'}
	</button>

	<!-- Dropdown for remaining options -->
	<div
		class="relative rounded-e-lg {getButtonColor(
			displayedDropdownOption,
			currentValue === displayedDropdownOption?.value
		)}"
	>
		<!-- Second Option Button -->
		<button
			type="button"
			onclick={handleSecondClick}
			{disabled}
			class="flex cursor-pointer items-center gap-1 px-3 py-1.5 transition-all disabled:cursor-default disabled:opacity-40"
		>
			<span
				class="text-sm font-medium {currentValue === displayedDropdownOption?.value
					? 'text-white'
					: 'text-gray-700 dark:text-gray-200'}"
			>
				{displayedDropdownOption?.label || 'Select'}
			</span>
			{#if options.length > 2}
				<ChevronDown
					size={14}
					strokeWidth={2}
					class={currentValue === displayedDropdownOption?.value
						? 'text-white'
						: 'text-gray-700 dark:text-gray-200'}
				/>
			{/if}
		</button>

		{#if options.length > 2}
			<!-- Actual select element overlaid on top -->
			<select
				onchange={handleDropdownSelect}
				value={selected}
				{disabled}
				class="absolute top-0 ltr:right-0 rtl:left-0 h-8 w-8 bg-gray-950 dark:bg-zinc-750 cursor-pointer opacity-0 disabled:cursor-default"
			>
				{#each dropdownOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		{/if}
	</div>
</div>
