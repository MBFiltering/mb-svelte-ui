<script>
	import { ChevronDown } from '@lucide/svelte';

	let {
		options = [],
		selected = '',
		value = '',
		onChange = () => {},
		onchange = () => {},
		onSelect = () => {},
		disabled = false,
		size = 'md',
		className = ''
	} = $props();

	const sizeClasses = {
		sm: 'min-h-8 px-3 py-1.5 text-sm',
		md: 'min-h-9 px-3.5 py-2 text-sm',
		lg: 'min-h-11 px-4 py-2.5 text-base'
	};

	const currentValue = $derived(selected || value || options[0]?.value || '');
	const currentOption = $derived(options.find((option) => option.value === currentValue) || options[0]);
	const currentSizeClass = $derived(sizeClasses[size] || sizeClasses.md);

	function emitChange(nextValue) {
		if (disabled || !nextValue || nextValue === currentValue) return;
		onChange?.(nextValue);
		onchange?.(nextValue);
		onSelect?.(nextValue);
	}

	function handleSelect(event) {
		emitChange(event.currentTarget.value);
	}
</script>

<div class={`relative inline-flex overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm dark:border-zinc-750 dark:bg-zinc-800 dark:text-gray-100 ${className}`.trim()}>
	<div class={`pointer-events-none flex items-center gap-2 font-medium ${currentSizeClass}`}>
		<span>{currentOption?.label || 'Select'}</span>
		<ChevronDown size={14} strokeWidth={2} class="shrink-0" />
	</div>
	<select
		onchange={handleSelect}
		value={currentValue}
		{disabled}
		class="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-default"
	>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>
