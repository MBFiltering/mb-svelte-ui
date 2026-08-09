<script>
	import { Menu } from '@lucide/svelte';
	import NavButton from '../atoms/NavButton.svelte';
	import NavDropdown from '../atoms/NavDropdown.svelte';
	import {
		getNavButtonColorClasses,
		getNavButtonStateClasses,
		getNavMenuItemClasses,
		NAV_PANEL_CLASSES
	} from '../atoms/navButtonStyles.js';
	import { dismissOnOutside } from '../../utils/dismiss.js';

	/**
	 * HeaderNav - The header's navigation, rendered from data so the same items
	 * can be an icon row on sm+ and a labelled stack inside the hamburger below
	 * it. Taking items as an array rather than a snippet is what keeps the two
	 * presentations from drifting.
	 *
	 * @typedef {Object} NavItem
	 * @property {any} [icon] Lucide icon component
	 * @property {string} label Visible label; also the accessible name
	 * @property {string} [title] Tooltip / accessible name when it differs from `label`
	 * @property {string} [href] Link mode
	 * @property {(event: Event) => void} [onclick] Button mode; wins over `href`
	 * @property {'azure'|'red'|'green'|'gray'} [color]
	 * @property {boolean} [disabled]
	 * @property {NavItem[]} [items] Nested group — a NavDropdown on sm+, a labelled
	 *   section in the hamburger menu. One level only.
	 */

	let {
		/** @type {NavItem[]} */
		items = [],
		menuLabel = 'Menu',
		className = ''
	} = $props();

	let isOpen = $state(false);
	let menuElement = $state(null);

	const menuId = $props.id();

	const navItems = $derived(Array.isArray(items) ? items.filter(Boolean) : []);
	const triggerClasses = $derived(
		`g2 flex items-center gap-2 rounded-lg border px-2 py-2 font-medium transition-colors ${getNavButtonColorClasses('azure')} ${getNavButtonStateClasses(false)}`
	);

	const close = () => (isOpen = false);

	function handleItemClick(item, event) {
		if (item.disabled) {
			event.preventDefault();
			return;
		}

		item.onclick?.(event);
		close();
	}

	$effect(() => {
		if (!isOpen) return;
		return dismissOnOutside(() => menuElement, close);
	});
</script>

{#snippet menuItem(/** @type {NavItem} */ item)}
	{#if item.href && !item.onclick}
		<a
			href={item.disabled ? undefined : item.href}
			onclick={(event) => handleItemClick(item, event)}
			class={getNavMenuItemClasses(item)}
			aria-label={item.title || item.label}
			aria-disabled={item.disabled}
			tabindex={item.disabled ? -1 : 0}
			role="menuitem"
		>
			{#if item.icon}
				{@const ItemIcon = item.icon}
				<ItemIcon size={18} strokeWidth={2} aria-hidden="true" />
			{/if}
			<span>{item.label}</span>
		</a>
	{:else}
		<button
			type="button"
			onclick={(event) => handleItemClick(item, event)}
			disabled={item.disabled}
			class={getNavMenuItemClasses(item)}
			aria-label={item.title || item.label}
			role="menuitem"
		>
			{#if item.icon}
				{@const ItemIcon = item.icon}
				<ItemIcon size={18} strokeWidth={2} aria-hidden="true" />
			{/if}
			<span>{item.label}</span>
		</button>
	{/if}
{/snippet}

<!-- Wide: the icon row, exactly as it was before the menu existed. -->
<div class="hidden items-center gap-2 sm:flex sm:gap-4 {className}">
	{#each navItems as item}
		{#if item.items?.length}
			<NavDropdown
				config={item.items}
				icon={item.icon}
				label={item.label}
				title={item.title}
				color={item.color}
				disabled={item.disabled}
			/>
		{:else}
			<NavButton
				href={item.href}
				onclick={item.onclick}
				icon={item.icon}
				label={item.label}
				title={item.title}
				color={item.color}
				disabled={item.disabled}
			/>
		{/if}
	{/each}
</div>

<!-- Narrow: one hamburger. Labels are always visible here, unlike the row. -->
<div class="relative sm:hidden" bind:this={menuElement}>
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		class={triggerClasses}
		title={menuLabel}
		aria-label={menuLabel}
		aria-haspopup="menu"
		aria-expanded={isOpen}
		aria-controls={menuId}
	>
		<Menu size={18} strokeWidth={2} aria-hidden="true" />
	</button>

	{#if isOpen}
		<div id={menuId} class={NAV_PANEL_CLASSES} role="menu" aria-label={menuLabel}>
			{#each navItems as item}
				{#if item.items?.length}
					<div role="group" aria-label={item.title || item.label} class="space-y-1.5">
						<div class="px-3 pt-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
							{item.label}
						</div>
						{#each item.items as subItem}
							{@render menuItem(subItem)}
						{/each}
					</div>
				{:else}
					{@render menuItem(item)}
				{/if}
			{/each}
		</div>
	{/if}
</div>
