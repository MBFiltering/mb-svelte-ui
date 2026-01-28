<script>
	import { onMount } from 'svelte';
	import SvgIcon from '../atoms/SvgIcon.svelte';
	import Kbd from '../atoms/Kbd.svelte';
	import ControlButton from '../atoms/ControlButton.svelte';
	import { Search, X, ListCollapse } from '@lucide/svelte';
	import { fuzzyIncludes } from '../../utils/stringUtils.js';

	// Browser detection (works without SvelteKit's $app/environment)
	const browser = typeof window !== 'undefined';

	/**
	 * SectionedPage - A reusable template component for pages with:
	 * - Sidebar navigation with section tabs
	 * - Magic search functionality
	 * - Expand/collapse all islands
	 *
	 * Usage:
	 * <SectionedPage
	 *   sections={[{ key: 'info', name: 'Info', icon: User, shortcut: 'I' }]}
	 *   navActions={[{ label: 'Action', icon: Star, onclick: () => {} }]}
	 *   loading={false}
	 *   error=""
	 *   onRetry={() => {}}
	 * >
	 *   {#snippet header()}...{/snippet}
	 *   {#snippet sidebarSkeleton()}...{/snippet}
	 *   {#snippet mainSkeleton()}...{/snippet}
	 *   {#snippet sectionContent(ctx)}...{/snippet}
	 * </SectionedPage>
	 *
	 * ctx object provides:
	 * - activeSection: current active section key
	 * - magicSearchActive: boolean if magic search is active
	 * - magicSearchQuery: current search query
	 * - allIslandsExpanded: boolean for island default state
	 * - islandResetKey: key to force island re-render
	 * - isVisible(sectionKey): returns true if section should be shown
	 * - isVisibleMulti(sectionKey, ...additionalKeys): returns true if any key matches
	 * - islandProps: object with defaultExpanded and forceExpanded for Islands
	 */

	// Props
	let {
		// Section configuration
		sections = [],

		// Navigation action buttons (e.g., Presets Library, Filter Removal)
		navActions = [],

		// Loading states
		loading = false,
		error = '',
		onRetry = () => {},

		// Snippets (sidebarSkeleton and mainSkeleton are required for loading states)
		header,
		sidebarSkeleton,
		mainSkeleton,
		sectionContent
	} = $props();

	// Internal state
	let activeSection = $state('');
	let allIslandsExpanded = $state(true);
	let islandResetKey = $state(0);
	let magicSearchQuery = $state('');
	let magicSearchInput = $state(null);
	let magicSearchNoMatches = $state(false);

	// Derived state
	let magicSearchActive = $derived(magicSearchQuery.trim().length > 0);

	// Double-tap "C" detection for collapse/expand all shortcut
	let lastCPressTime = 0;
	const doubleTapThreshold = 300; // milliseconds

	// Initialize active section from first available section
	$effect(() => {
		if (sections.length > 0 && !activeSection) {
			// Check URL hash first
			if (browser) {
				const hash = window.location.hash.slice(1);
				if (hash && sections.some((s) => s.key === hash)) {
					activeSection = hash;
					return;
				}
			}
			// Default to first section
			activeSection = sections[0].key;
		}
	});

	// Validate active section when sections change
	$effect(() => {
		if (!browser || sections.length === 0) return;

		const validKeys = sections.map((s) => s.key);
		if (activeSection && !validKeys.includes(activeSection)) {
			// Invalid section - reset to first available
			const firstSection = sections[0]?.key || '';
			activeSection = firstSection;
			// Clear hash from URL without adding to history
			window.history.replaceState(null, '', window.location.pathname);
		}
	});

	// Toggle all islands expanded/collapsed
	function toggleAllIslands() {
		allIslandsExpanded = !allIslandsExpanded;
		islandResetKey++; // Force re-render all islands with new default
	}

	// Select a section
	function selectSection(key) {
		activeSection = key;
		// Update URL hash using native assignment (adds to browser history naturally)
		if (browser) {
			window.location.hash = key;
		}
	}

	// Handle browser back/forward with hash changes
	function handleHashChange() {
		const hash = window.location.hash.slice(1);
		const validKeys = sections.map((s) => s.key);

		if (hash && validKeys.includes(hash)) {
			// Valid hash - update active section
			activeSection = hash;
		} else if (hash && !validKeys.includes(hash)) {
			// Invalid hash - clear it without adding to history
			window.history.replaceState(null, '', window.location.pathname);
			activeSection = sections[0]?.key || '';
		}
		// If no hash, leave activeSection as-is (don't interfere with normal navigation)
	}

	// Magic search: DOM-based effect that scans all data-magicsearch elements
	$effect(() => {
		if (typeof document === 'undefined') return; // SSR guard

		const query = magicSearchQuery.trim().toLowerCase();

		// Find all elements with data-magicsearch attribute
		const searchableElements = document.querySelectorAll('[data-magicsearch]');

		// Track if any islands match
		let hasAnyIslandMatch = false;

		searchableElements.forEach((el) => {
			const terms = (el.dataset.magicsearch || '').toLowerCase();

			if (!query) {
				// No search active - remove all match classes
				el.classList.remove('magicsearch-match', 'magicsearch-island-match');
			} else if (fuzzyIncludes(query, terms)) {
				// This element matches the query (with 1-character typo tolerance)
				el.classList.add('magicsearch-match');
				// If it's an island, also add island-match so all children are shown
				if (el.classList.contains('magicsearch-island')) {
					el.classList.add('magicsearch-island-match');
					hasAnyIslandMatch = true;
				}
			} else {
				// This element doesn't match
				el.classList.remove('magicsearch-match', 'magicsearch-island-match');
			}
		});

		// Check if any island is visible
		if (query) {
			const visibleIslands = document.querySelectorAll(
				'.magicsearch-island.magicsearch-match, .magicsearch-island:has(.magicsearch-match)'
			);
			magicSearchNoMatches = visibleIslands.length === 0;
		} else {
			magicSearchNoMatches = false;
		}
	});

	// Clear magic search
	function clearMagicSearch() {
		magicSearchQuery = '';
	}

	// Keyboard shortcut handler
	function handleKeyDown(event) {
		// Ignore if user is typing in an input or textarea
		if (
			event.target.tagName === 'INPUT' ||
			event.target.tagName === 'TEXTAREA' ||
			event.target.isContentEditable
		) {
			// Exception: Allow Alt+Shift+M even in inputs
			if (event.altKey && event.shiftKey && event.key.toUpperCase() === 'M') {
				event.preventDefault();
				magicSearchInput?.focus();
			}
			return;
		}

		// Check for double-tap "C" to toggle collapse/expand all islands (disabled during magic search)
		if (
			!magicSearchActive &&
			event.key.toLowerCase() === 'c' &&
			!event.altKey &&
			!event.shiftKey &&
			!event.ctrlKey &&
			!event.metaKey
		) {
			const now = Date.now();
			if (now - lastCPressTime < doubleTapThreshold) {
				event.preventDefault();
				toggleAllIslands();
				lastCPressTime = 0; // Reset to prevent triple-tap triggering again
			} else {
				lastCPressTime = now;
			}
			return;
		}

		// Alt+Shift+M to focus magic search
		if (event.altKey && event.shiftKey && event.key.toUpperCase() === 'M') {
			event.preventDefault();
			magicSearchInput?.focus();
			return;
		}

		// Check for Alt + Shift + letter shortcuts for section navigation
		if (event.altKey && event.shiftKey) {
			const key = event.key.toUpperCase();
			const section = sections.find((s) => s.shortcut === key);

			if (section) {
				event.preventDefault();
				selectSection(section.key);
			}
		}
	}

	onMount(() => {
		// Add keyboard event listener
		window.addEventListener('keydown', handleKeyDown);
		// Add hashchange listener for browser back/forward
		window.addEventListener('hashchange', handleHashChange);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('hashchange', handleHashChange);
		};
	});

	// Context object passed to sectionContent snippet
	let sectionContext = $derived({
		// Raw state values
		activeSection,
		magicSearchActive,
		magicSearchQuery,
		allIslandsExpanded,
		islandResetKey,

		// Helper: Check if a section should be visible
		// Returns true if magic search is active OR if the section matches activeSection
		isVisible: (sectionKey) => {
			if (magicSearchActive) return true;
			return activeSection === sectionKey;
		},

		// Helper: Check if any of multiple sections should be visible
		// Useful for content shared across multiple tabs (e.g., New Apps in both Apps and Requests)
		isVisibleMulti: (...sectionKeys) => {
			if (magicSearchActive) return true;
			return sectionKeys.includes(activeSection);
		},

		// Helper: Props to spread on Island components for expand/collapse behavior
		// Usage: <Island {...ctx.islandProps}>
		islandProps: {
			defaultExpanded: allIslandsExpanded,
			forceExpanded: magicSearchActive
		}
	});
</script>

<div>
	<div class="relative flex">
		<!-- Sidebar -->
		<div
			class="fixed bottom-0 left-0 z-40 flex h-14 w-full shrink-0 flex-col space-y-4 sm:sticky sm:top-14 sm:h-[calc(100%-3.5rem)] sm:w-13 sm:pt-8 lg:w-96"
		>
			{#if loading}
				{#if sidebarSkeleton}
					{@render sidebarSkeleton()}
				{/if}
			{:else}
				<!-- Header slot (hidden on mobile, shown on desktop) -->
				{#if header}
					<div class="hidden pl-4 lg:inline-block">
						{@render header()}
					</div>
				{/if}

				<!-- Navigation tabs -->
				<div
					class="no-scrollbar h-full max-h-full w-full space-y-2 overflow-x-auto overflow-y-auto border-t border-gray-900/25 bg-white p-2 pb-0 shadow-lg sm:w-auto sm:rounded-r-xl sm:border-0 sm:border-none sm:pb-2 dark:border-white/25 dark:bg-zinc-800"
				>
					<ul class="flex justify-evenly space-y-2 sm:inline sm:w-auto sm:justify-normal">
						<!-- Nav action buttons -->
						{#if navActions.length > 0}
							<div
								class="mt-1.5 mb-2 flex flex-row justify-between gap-2 px-1.5 sm:mt-1 sm:flex-col lg:mt-0 lg:mb-1 lg:flex-row"
							>
								{#each navActions as action}
									<li>
										<button
											class="cursor-pointer text-xs font-medium text-azure-700 hover:text-azure-900 hover:underline dark:text-azure-400 dark:hover:text-azure-600"
											title={action.title || action.label}
											onclick={action.onclick}
										>
											<div class="hidden gap-1 lg:flex">
												<action.icon size={16} />
												<p class="hidden lg:inline">{action.label}</p>
											</div>
											<div class="inline lg:hidden">
												<action.icon size={24} />
											</div>
										</button>
									</li>
								{/each}
							</div>
						{/if}

						<!-- Section tabs -->
						{#each sections as section}
							<li class="pr-2 sm:pr-0">
								<button
									type="button"
									onclick={() => selectSection(section.key)}
									title={section.name}
									class="flex w-full items-center justify-between rounded-lg border px-2 py-2 transition-colors lg:px-4 {magicSearchActive
										? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-700/50 opacity-50 dark:border-gray-800/25 dark:bg-gray-900 dark:text-gray-200/50'
										: activeSection === section.key
											? 'cursor-pointer border-azure-500 bg-gradient-to-bl from-azure-500 to-azure-700 text-white hover:bg-azure-900'
											: 'cursor-pointer border-azure-100 bg-azure-50 text-azure-700 hover:bg-azure-100 dark:border-zinc-750 dark:bg-zinc-800 dark:text-azure-200 dark:hover:bg-zinc-750'}"
									disabled={magicSearchActive}
								>
									<div class="flex items-center gap-2">
										{#if section.svgIcon}
											<SvgIcon name={section.svgIcon} size="w-[18px] h-[18px]" />
										{:else if section.icon}
											<section.icon size={18} strokeWidth={2} />
										{/if}
										<p class="hidden font-medium lg:inline-block">{section.name}</p>
										{#if section.shortcut}
											<div class="hidden lg:inline-block">
												<Kbd>Alt + Shift + {section.shortcut}</Kbd>
											</div>
										{/if}
									</div>
									{#if section.advanced}
										<p class="hidden text-sm lg:block">advanced</p>
									{/if}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>

		<!-- Main content area -->
		<div
			class="w-full space-y-3 p-4 sm:space-y-6 sm:p-8 {magicSearchActive
				? 'magicsearch-active'
				: ''} {magicSearchNoMatches ? 'magicsearch-nomatches' : ''}"
		>
			{#if loading}
				{#if mainSkeleton}
					{@render mainSkeleton()}
				{/if}
			{:else if error}
				<div class="rounded-lg bg-white p-8 shadow-lg">
					<div class="mb-4 rounded bg-red-alt-50 px-4 py-3 text-red-alt-600">{error}</div>
					<ControlButton onclick={onRetry} color="azure" size="md">Try Again</ControlButton>
				</div>
			{:else}
				<!-- Header on mobile (shown on mobile, hidden on desktop since it's in sidebar) -->
				{#if header}
					<div class="inline-block w-full lg:hidden">
						{@render header()}
					</div>
				{/if}

				<!-- Magic Search Bar -->
				<div class="z-30 flex gap-1 px-4">
					<div class="relative flex-1 lg:px-0">
						<div class="relative">
							<div
								class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 peer-focus:text-azure-700 dark:text-gray-500 dark:peer-focus:text-azure-200"
							>
								<Search size={16} />
							</div>
							<input
								type="text"
								bind:this={magicSearchInput}
								bind:value={magicSearchQuery}
								placeholder="Magic search..."
								class="peer w-full rounded-lg border border-gray-900/25 bg-neutral-100 py-2 pr-28 pl-9 text-sm text-gray-700 placeholder-gray-400 transition-colors focus:border-azure-700 focus:pr-8 focus:outline-none dark:border-white/25 dark:bg-zinc-750 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-azure-500"
							/>
							{#if !magicSearchActive}
								<div
									class="helper pointer-events-none absolute top-1/2 right-2 -translate-y-4 peer-focus:hidden"
								>
									<Kbd>Alt+Shift+M</Kbd>
								</div>
							{/if}
							{#if magicSearchActive}
								<button
									type="button"
									onclick={clearMagicSearch}
									class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
								>
									<X size={14} />
								</button>
							{/if}
						</div>
					</div>
					<!-- Collapse/Expand All -->
					<button
						class="h-full rounded-full p-2 transition-colors {magicSearchActive
							? 'cursor-not-allowed text-gray-400 opacity-50'
							: 'cursor-pointer text-gray-700 hover:bg-gray-900/10'}"
						title={magicSearchActive
							? 'Disabled during search'
							: allIslandsExpanded
								? 'Collapse all sections (CC)'
								: 'Expand all sections (CC)'}
						onclick={toggleAllIslands}
						disabled={magicSearchActive}
					>
						<ListCollapse
							size={20}
							class="transition-transform {allIslandsExpanded ? '' : 'rotate-180'}"
						/>
					</button>
				</div>

				<!-- Magic search: No results message -->
				<div class="magicsearch-noresults p-8 text-center">
					<p class="text-gray-900/50">
						Nothing found for <span class="font-medium text-gray-700">"{magicSearchQuery}"</span><br
						/><br />
						Check your spelling, or try searching for related words.
					</p>
				</div>

				<!-- Section content -->
				{#key islandResetKey}
					{#if sectionContent}
						{@render sectionContent(sectionContext)}
					{/if}
				{/key}
			{/if}
		</div>
	</div>
</div>
