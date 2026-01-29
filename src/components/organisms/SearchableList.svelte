<script>
	import Checkbox from '../atoms/CheckBox.svelte';
	import TextInput from '../atoms/TextInput.svelte';
	import Grid from '../molecules/Grid.svelte';
	import { fuzzyIncludes } from '../../utils/stringUtils.js';

	// Props - Svelte 5 style
	let {
		title = 'Items',
		items = [],
		searchKeys = [],
		searchPlaceholder = 'Search...',
		specialFilters = {},
		emptyMessage = 'No items found',
		itemName = 'item',
		filterTabs = [], // Array of { key, label, filterFn }
		columns = 1, // Number of columns for calculating rows
		columns2Xl = 2, // Number of columns for calculating rows
		disableGrid = false, // When true, items display in normal flow instead of grid
		searchActions,
		children,
		// Bulk selection props
		bulk = false,
		selected = $bindable([]), // array of selected item ids (bind:selected)
		selectedItems = $bindable([]), // array of selected item objects (bind:selectedItems)
		selectId = 'id',
		idKey = null // Optional key to use for the each block (overrides auto-detection)
	} = $props();

	let searchQuery = $state('');
	let activeFilter = $state(filterTabs.length > 0 ? filterTabs[0].key : null);

	// Get plural form of item name with proper pluralization rules
	const pluralItemName = $derived.by(() => {
		if (items.length === 1) return itemName;

		// Handle irregular plurals
		const irregularPlurals = {
			category: 'categories',
			app: 'apps',
			item: 'items',
			device: 'devices',
			customer: 'customers'
		};

		if (irregularPlurals[itemName.toLowerCase()]) {
			return irregularPlurals[itemName.toLowerCase()];
		}

		// Handle words ending in 'y' preceded by a consonant
		if (/[^aeiou]y$/i.test(itemName)) {
			return itemName.slice(0, -1) + 'ies';
		}

		// Default: just add 's'
		return `${itemName}s`;
	});

	// Apply tab filter first, then search filter
	const filteredItems = $derived.by(() => {
		// First apply tab filter if active
		let tabFilteredItems = items;
		if (activeFilter && filterTabs.length > 0) {
			const activeTab = filterTabs.find((tab) => tab.key === activeFilter);
			if (activeTab && activeTab.filterFn) {
				tabFilteredItems = items.filter(activeTab.filterFn);
			}
		}

		// Then apply search filter
		if (!searchQuery.trim()) {
			return tabFilteredItems;
		}

		const query = searchQuery.toLowerCase().trim();

		// Check if query matches any special filter
		for (const [filterKey, filterValue] of Object.entries(specialFilters)) {
			if (query === filterKey.toLowerCase()) {
				return tabFilteredItems.filter((item) => {
					const itemValue = getNestedValue(item, filterValue.path);
					return itemValue === filterValue.value;
				});
			}
		}

		// Regular search across specified keys (with fuzzy matching)
		return tabFilteredItems.filter((item) => {
			return searchKeys.some((key) => {
				const value = getNestedValue(item, key);
				return value && fuzzyIncludes(query, String(value).toLowerCase());
			});
		});
	});

	// Derived list of visible ids for current filter/search
	const visibleIds = $derived.by(() =>
		filteredItems.map((it) => getItemId(it)).filter((id) => id !== undefined && id !== null)
	);

	const allVisibleSelected = $derived.by(() => {
		const ids = visibleIds;
		if (ids.length === 0) return false;
		return ids.every((id) => selected.indexOf(id) !== -1);
	});

	const someVisibleSelected = $derived.by(() => {
		const ids = visibleIds;
		return ids.some((id) => selected.indexOf(id) !== -1);
	});

	function toggleSelectAllVisible() {
		const ids = visibleIds;
		if (ids.length === 0) return;
		const allSelected = allVisibleSelected;
		if (allSelected) {
			// unselect visible ids
			selected = selected.filter((id) => !ids.includes(id));
			selectedItems = selectedItems.filter((it) => !ids.includes(getItemId(it)));
		} else {
			// add missing visible ids
			const newSelected = Array.from(new Set([...selected, ...ids]));
			selected = newSelected;
			// ensure selectedItems contains the visible objects
			const vis = filteredItems;
			vis.forEach((it) => {
				const id = getItemId(it);
				if (!selectedItems.some((si) => getItemId(si) === id)) selectedItems.push(it);
			});
		}
	}

	// Helper to get item id by selectId path
	function getItemId(item) {
		return getNestedValue(item, selectId);
	}

	// Toggle selection for an item (by id)
	function toggleSelect(item) {
		const id = getItemId(item);
		if (id === undefined || id === null) return;

		const idx = selected.indexOf(id);
		if (idx === -1) {
			// add
			selected = [...selected, id];
			selectedItems = [...selectedItems, item];
		} else {
			// remove
			selected = selected.filter((s) => s !== id);
			selectedItems = selectedItems.filter((it) => getItemId(it) !== id);
		}
	}

	// Utility: check if item is selected
	function isSelected(item) {
		const id = getItemId(item);
		return id !== undefined && id !== null && selected.indexOf(id) !== -1;
	}

	// Helper function to get nested values from object
	function getNestedValue(obj, path) {
		return path.split('.').reduce((current, prop) => current?.[prop], obj);
	}
</script>

<div class="space-y-4">
	<!-- Filter Tabs -->
	{#if filterTabs.length > 0}
		<div class="flex gap-2 border-b border-gray-200">
			{#each filterTabs as tab}
				<button
					type="button"
					onclick={() => (activeFilter = tab.key)}
					class="cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors {activeFilter ===
					tab.key
						? 'border-azure-700 text-azure-700'
						: 'border-transparent text-gray-900/50 hover:text-azure-700'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Search Bar with Actions -->
	<div class="magicsearch-item flex flex-col items-center gap-3 md:flex-row">
		<div class="relative flex w-full flex-1 gap-1 md:w-auto">
			{#if bulk}
				<div class="mr-2 flex items-center">
					<Checkbox
						checked={allVisibleSelected}
						indeterminate={someVisibleSelected && !allVisibleSelected}
						onclick={toggleSelectAllVisible}
						ariaLabel="Select all visible"
					/>
				</div>
			{/if}
			<TextInput
				bind:value={searchQuery}
				placeholder={searchPlaceholder}
				size="sm"
				showSearchIcon
			/>
		</div>
		<!-- Optional actions slot -->
		{#if searchActions}
			<div class="flex w-full shrink-0 gap-2 sm:w-auto">
				{@render searchActions?.(activeFilter)}
			</div>
		{/if}
	</div>

	<!-- Results Count -->
	<div class="magicsearch-item text-sm text-gray-600 dark:text-gray-300">
		{filteredItems.length} of {items.length}
		{pluralItemName}{bulk ? `, ${selected.length} selected` : ''}
	</div>

	<!-- List Container -->
	<Grid flow="col" itemCount={filteredItems.length} {columns} {columns2Xl} disabled={disableGrid}>
		{#if filteredItems.length === 0}
			<div class="rounded-lg py-8 text-center text-gray-500 dark:text-gray-400">
				{emptyMessage}
			</div>
		{:else}
			{#each filteredItems as item, index (idKey ? item[idKey] : item.package || item.url || item.id || index)}
				{#if bulk}
					<div class="flex items-center gap-3">
						<div class="magicsearch-item flex items-start">
							<Checkbox checked={isSelected(item)} onclick={() => toggleSelect(item)} />
						</div>
						<div class="flex-1">{@render children?.(item, activeFilter)}</div>
					</div>
				{:else}
					{@render children?.(item, activeFilter)}
				{/if}
			{/each}
		{/if}
	</Grid>
</div>
