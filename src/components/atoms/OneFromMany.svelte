<script>
	import { ChevronDown } from '@lucide/svelte';

	let {
		options = [], // Array of { value, label, color, textColor }
		selected = '',
		value = '', // Support both selected and value for backwards compatibility
		onChange = () => {}, // Primary callback
		onSelect = () => {}, // Backwards compatibility
		disabled = false,
		visibleCount = 2
	} = $props();

	const currentValue = $derived(selected ?? value);

	// Clamp visibleCount to valid range
	const clampedCount = $derived(Math.max(1, Math.min(visibleCount, options.length)));

	// Whether we need a dropdown (more options than visible slots)
	const hasDropdown = $derived(options.length > clampedCount);

	// Fixed buttons shown as standalone toggles
	const fixedOptions = $derived(hasDropdown ? options.slice(0, clampedCount - 1) : options);
	const isDropdownOnly = $derived(hasDropdown && fixedOptions.length === 0);

	// All options that can appear in the dropdown button position
	const toggleableOptions = $derived(hasDropdown ? options.slice(clampedCount - 1) : []);

	// Track the last selected dropdown option (for toggle behavior)
	let lastDropdownSelection = $state(null);

	// Initialize lastDropdownSelection on first render if current value is a toggleable option
	$effect.pre(() => {
		if (lastDropdownSelection === null && toggleableOptions.length > 0) {
			const initialValue = selected ?? value;
			const isToggleableOption = toggleableOptions.some((opt) => opt.value === initialValue);
			if (isToggleableOption) {
				lastDropdownSelection = initialValue;
			}
		}
	});

	// Get the option to display in the dropdown button
	const displayedDropdownOption = $derived.by(() => {
		if (lastDropdownSelection) {
			const remembered = toggleableOptions.find((opt) => opt.value === lastDropdownSelection);
			if (remembered) return remembered;
		}
		const current = toggleableOptions.find((opt) => opt.value === currentValue);
		if (current) return current;
		return toggleableOptions[0];
	});

	// Get the button color based on which option is selected
	function getButtonColor(option, isSelected) {
		if (!option) return 'bg-gray-100 dark:bg-zinc-750';
		// Show actual color only if selected, otherwise gray
		return isSelected
			? option.color || 'bg-gray-100 dark:bg-zinc-750'
			: 'bg-gray-100 dark:bg-zinc-750';
	}

	// Get the text color for a selected option (defaults to white)
	function getTextColor(option, isSelected) {
		if (!isSelected) return 'text-gray-700 dark:text-gray-200';
		return option?.textColor || 'text-white';
	}

	// Handle clicking a fixed option
	function handleFixedClick(optionValue) {
		if (disabled) return;
		if (onChange) onChange(optionValue);
		if (onSelect) onSelect(optionValue);
	}

	// Handle clicking the dropdown button (toggle back to remembered selection)
	function handleDropdownButtonClick() {
		if (disabled) return;
		const targetValue = displayedDropdownOption?.value;
		lastDropdownSelection = targetValue;
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
	<!-- Fixed Option Buttons -->
	{#each fixedOptions as option, i}
		<button
			type="button"
			onclick={() => handleFixedClick(option.value)}
			{disabled}
			class="cursor-pointer px-3 py-1.5 text-sm font-medium transition-all {i === 0
				? 'rounded-s-lg'
				: ''} {!hasDropdown && i === fixedOptions.length - 1
				? 'rounded-e-lg'
				: ''} {getButtonColor(option, currentValue === option?.value)} {getTextColor(option, currentValue === option?.value)} {currentValue ===
			option?.value
				? 'opacity-100'
				: 'opacity-100 hover:opacity-80'} disabled:cursor-default disabled:opacity-40"
		>
			{option?.label || `Option ${i + 1}`}
		</button>
	{/each}

	<!-- Dropdown for remaining options -->
	{#if hasDropdown}
		<div
			class="relative {fixedOptions.length === 0
				? 'rounded-lg'
				: 'rounded-e-lg'} {getButtonColor(
				displayedDropdownOption,
				currentValue === displayedDropdownOption?.value
			)}"
		>
			<button
				type="button"
				onclick={isDropdownOnly ? undefined : handleDropdownButtonClick}
				{disabled}
				class="flex cursor-pointer items-center gap-1 px-3 py-1.5 transition-all disabled:cursor-default disabled:opacity-40"
			>
				<span
					class="text-sm font-medium {getTextColor(displayedDropdownOption, currentValue === displayedDropdownOption?.value)}"
				>
					{displayedDropdownOption?.label || 'Select'}
				</span>
				<ChevronDown
					size={14}
					strokeWidth={2}
					class={getTextColor(displayedDropdownOption, currentValue === displayedDropdownOption?.value)}
				/>
			</button>

			<select
				onchange={handleDropdownSelect}
				value={currentValue}
				{disabled}
				class="absolute top-0 ltr:right-0 rtl:left-0 {isDropdownOnly
					? 'h-full w-full'
					: 'h-8 w-8'} cursor-pointer opacity-0 disabled:cursor-default"
			>
				{#each toggleableOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
	{/if}
</div>
