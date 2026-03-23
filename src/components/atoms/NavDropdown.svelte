<script>
	import { ChevronDown } from '@lucide/svelte';
	import { getNavButtonColorClasses, getNavButtonStateClasses } from './navButtonStyles.js';

	let {
		config = [],
		icon = null,
		label = '',
		title = '',
		color = 'azure',
		disabled = false,
		className = '',
		dropdownClassName = ''
	} = $props();

	let isOpen = $state(false);
	let dropdownElement = null;

	const items = $derived(Array.isArray(config) ? config.filter(Boolean) : []);
	const isTriggerDisabled = $derived(disabled || items.length === 0);
	const triggerClasses = $derived(
		`flex items-center gap-2 rounded-lg border px-2 py-2 font-medium transition-colors xl:px-4 ${getNavButtonColorClasses(color)} ${className}`
	);
	const triggerStateClasses = $derived(getNavButtonStateClasses(isTriggerDisabled));

	function getItemClasses(item) {
		return `flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors ${getNavButtonColorClasses(item.color)} ${getNavButtonStateClasses(item.disabled)} ${item.className || ''}`;
	}

	function toggleDropdown() {
		if (isTriggerDisabled) return;
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	function handleItemClick(item, event) {
		if (item.disabled) {
			event.preventDefault();
			return;
		}

		item.onclick?.(event);
		closeDropdown();
	}

	$effect(() => {
		if (!isOpen) return;

		const handlePointerDown = (event) => {
			if (!dropdownElement?.contains(event.target)) {
				closeDropdown();
			}
		};

		const handleKeydown = (event) => {
			if (event.key === 'Escape') {
				closeDropdown();
			}
		};

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="relative inline-block" bind:this={dropdownElement}>
	<button
		type="button"
		onclick={toggleDropdown}
		disabled={isTriggerDisabled}
		class="{triggerClasses} {triggerStateClasses}"
		title={title || label}
		aria-label={title || label}
		aria-expanded={isOpen}
		aria-haspopup="menu"
	>
		{#if icon}
			{@const IconComponent = icon}
			<IconComponent size={18} strokeWidth={2} />
		{/if}
		{#if label}
			<span class="hidden text-sm xl:inline">{label}</span>
		{/if}
		<ChevronDown
			size={16}
			strokeWidth={2}
			class="transition-transform {isOpen ? 'rotate-180' : ''}"
		/>
	</button>

	{#if isOpen}
		<div
			class="absolute right-0 z-50 mt-2 min-w-56 rounded-xl border border-gray-200 bg-white p-1.5 space-y-1.5 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 {dropdownClassName}"
			role="menu"
			aria-label={title || label}
		>
			{#each items as item}

				{#if item.href && !item.onclick}
					<a
						href={item.disabled ? undefined : item.href}
						onclick={(event) => handleItemClick(item, event)}
						class={getItemClasses(item)}
						title={item.title || item.label}
						aria-label={item.title || item.label}
						aria-disabled={item.disabled}
						tabindex={item.disabled ? -1 : 0}
						role="menuitem"
					>
						{#if item.icon}
							{@const ItemIcon = item.icon}
							<ItemIcon size={18} strokeWidth={2} />
						{/if}
						{#if item.label}
							<span>{item.label}</span>
						{/if}
					</a>
				{:else}
					<button
						type="button"
						onclick={(event) => handleItemClick(item, event)}
						disabled={item.disabled}
						class={getItemClasses(item)}
						title={item.title || item.label}
						aria-label={item.title || item.label}
						role="menuitem"
					>
						{#if item.icon}
							{@const ItemIcon = item.icon}
							<ItemIcon size={18} strokeWidth={2} />
						{/if}
						{#if item.label}
							<span>{item.label}</span>
						{/if}
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>