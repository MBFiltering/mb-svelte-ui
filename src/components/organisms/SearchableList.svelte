<script>
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Checkbox from '../atoms/CheckBox.svelte';
	import CircleButton from '../atoms/CircleButton.svelte';
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
		itemNamePlural = '', // Optional plural form (if not provided, will auto-pluralize itemName)
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
		idKey = null, // Optional key to use for the each block (overrides auto-detection)
		// Pagination props
		pageSize = 24, // 0 = no pagination, >0 = items per page
		externalQuery = '', // Supplied search query from outside (e.g. SectionedPage magic search)
		// i18n text props
		ofText = 'of', // "of" text for "X of Y items"
		selectedText = 'selected', // "selected" text for bulk mode
		pageText = 'Page', // "Page" label for pagination
		prevText = 'Previous', // aria-label for previous button
		nextText = 'Next' // aria-label for next button
	} = $props();

	let searchQuery = $state('');
	let activeFilter = $state(filterTabs.length > 0 ? filterTabs[0].key : null);
	let currentPage = $state(1);

	// Effective query: externalQuery takes priority over the built-in search
	const effectiveQuery = $derived(externalQuery.trim() || searchQuery);

	// Reset to page 1 when search or filter changes
	$effect(() => {
		// track dependencies
		void effectiveQuery;
		void activeFilter;
		currentPage = 1;
	});

	const totalPages = $derived(pageSize > 0 ? Math.max(1, Math.ceil(filteredItems.length / pageSize)) : 1);

	// Clamp page if items shrink
	$effect(() => {
		if (currentPage > totalPages) currentPage = totalPages;
	});

	const paginatedItems = $derived.by(() => {
		if (pageSize <= 0) return filteredItems;
		const start = (currentPage - 1) * pageSize;
		return filteredItems.slice(start, start + pageSize);
	});

	// Get plural form of item name with proper pluralization rules
	const pluralItemName = $derived.by(() => {
		// If explicit plural provided, use it
		if (itemNamePlural) {
			return items.length === 1 ? itemName : itemNamePlural;
		}

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
		if (!effectiveQuery.trim()) {
			return tabFilteredItems;
		}

		const query = effectiveQuery.toLowerCase().trim();

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

	// Derived list of visible ids for current page
	const visibleIds = $derived.by(() =>
		paginatedItems.map((it) => getItemId(it)).filter((id) => id !== undefined && id !== null)
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
			const vis = paginatedItems;
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
		<div class="flex gap-2 border-b border-neutral-100 dark:border-zinc-750">
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
				<div class="me-2 flex items-center">
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
		{paginatedItems.length} {ofText} {filteredItems.length}
		{pluralItemName}{bulk ? `, ${selected.length} ${selectedText}` : ''}
	</div>

	<!-- List Container -->
	<Grid flow="col" itemCount={paginatedItems.length} {columns} {columns2Xl} disabled={disableGrid}>
		{#if paginatedItems.length === 0}
			<div class="rounded-lg py-8 text-center text-gray-500 dark:text-gray-400">
				{emptyMessage}
			</div>
		{:else}
			{#each paginatedItems as item, index (idKey ? item[idKey] : item.package || item.url || item.id || index)}
				{#if bulk}
					<div class="flex items-center gap-3">
						<div class="magicsearch-item flex items-start">
							<Checkbox checked={isSelected(item)} onclick={() => toggleSelect(item)} />
						</div>
						<div class="flex-1 min-w-0">{@render children?.(item, activeFilter)}</div>
					</div>
				{:else}
					{@render children?.(item, activeFilter)}
				{/if}
			{/each}
		{/if}
	</Grid>

	<!-- Pagination Controls -->
	{#if pageSize > 0 && totalPages > 1}
		<div class="flex items-center justify-center gap-2 pt-2">
			<CircleButton
				icon={ChevronLeft}
				title={prevText}
				disabled={currentPage <= 1}
				onclick={() => (currentPage = Math.max(1, currentPage - 1))}
				color="ghost2"
				size="sm"
				className="rtl:rotate-180"
			/>

			<span class="text-sm text-gray-600 dark:text-gray-300">
				{pageText} {currentPage} {ofText} {totalPages}
			</span>

			<CircleButton
				icon={ChevronRight}
				title={nextText}
				disabled={currentPage >= totalPages}
				onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
				color="ghost2"
				size="sm"
				className="rtl:rotate-180"
			/>
		</div>
	{/if}
</div>
