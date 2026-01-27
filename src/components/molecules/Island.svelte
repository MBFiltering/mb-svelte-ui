<script>
	// Props - Svelte 5 style
	import { ChevronDown } from '@lucide/svelte';
	import SvgIcon from '../atoms/SvgIcon.svelte';

	let {
		title = '',
		icon = null,
		svgIcon = '', // Name of SVG file in /static/icons (without .svg extension)
		defaultExpanded = true,
		forceExpanded = false, // When true, island is always expanded and cannot be collapsed
		className = '',
		collapsible = true,
		children
	} = $props();

	// State
	let internalExpanded = $state(defaultExpanded);

	// Use forceExpanded if set, otherwise use internal state
	let isExpanded = $derived(forceExpanded ? true : internalExpanded);

	// Toggle expand/collapse (only works if not forceExpanded)
	function toggleExpanded() {
		if (!forceExpanded) {
			internalExpanded = !internalExpanded;
		}
	}
</script>

<!-- Island Container -->
<div class="bg-white shadow-lg dark:bg-neutral-800 {className} rounded-xl">
	{#if title && collapsible && !forceExpanded}
		<!-- Header with collapse functionality -->
		<button
			class="flex w-full cursor-pointer items-center justify-between text-gray-700 hover:text-azure-700 {isExpanded
				? 'border-b'
				: ''} border-gray-100 px-3 py-2 transition-colors sm:px-6 sm:py-4"
			onclick={toggleExpanded}
			aria-label={isExpanded ? 'Collapse' : 'Expand'}
			title={isExpanded ? 'Collapse' : 'Expand'}
		>
			<!-- Title with Icon -->
			<div class="flex items-center gap-2">
				{#if svgIcon}
					<SvgIcon name={svgIcon} size="w-5 h-5" />
				{:else if icon}
					{@const IconComponent = icon}
					<IconComponent size={20} strokeWidth={2} />
				{/if}
				<h3 class="font-medium sm:text-lg">{title}</h3>
			</div>

			<!-- Arrow -->
			<ChevronDown
				size={20}
				class="h-5 w-5 transition-transform {isExpanded ? 'rotate-180' : ''}"
				aria-hidden="true"
			/>
		</button>
	{:else if title}
		<!-- Header without collapse functionality -->
		<div class="border-b border-gray-100 px-3 py-2 text-gray-700 sm:px-6 sm:py-4">
			<div class="flex items-center gap-2">
				{#if svgIcon}
					<SvgIcon name={svgIcon} size="w-5 h-5" />
				{:else if icon}
					{@const IconComponent = icon}
					<IconComponent size={20} strokeWidth={2} />
				{/if}
				<h3 class="font-medium sm:text-lg">{title}</h3>
			</div>
		</div>
	{/if}
	<!-- No header, just content -->
	<div class="p-3 sm:p-6 {isExpanded || forceExpanded ? 'block' : 'hidden'}">
		{@render children?.()}
	</div>
</div>
