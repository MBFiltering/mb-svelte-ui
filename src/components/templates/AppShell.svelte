<script>
	import SvgIcon from '../atoms/SvgIcon.svelte';

	/**
	 * AppShell - Full page layout template with header and main content area
	 * Includes:
	 * - Sticky header with logo, title, version string
	 * - Optional loading progress bar
	 * - Main content area with proper spacing
	 * - Content (search, buttons) passed via snippets
	 */
	let {
		// Header props
		logoIcon = 'mbsmart-logo',
		logoHref = '/dashboard',
		title = '',
		versionString = '',

		// Loading bar props
		loadingProgress = 0,
		isFullyLoaded = true,

		// Styling
		className = '',

		// Content snippets
		headerContent,
		children
	} = $props();
</script>

<div class="flex min-h-screen flex-col bg-neutral-100 dark:bg-zinc-750 {className}">
	<!-- Sticky Header -->
	<header class="sticky top-0 z-20 h-14 bg-white px-4 py-2 shadow-lg dark:bg-zinc-800">
		<div class="flex items-center justify-between gap-4">
			<!-- Logo and Title Section (single link: logo + title + version) -->
			<a
				href={logoHref}
				class="group flex cursor-pointer gap-4"
				aria-label="Home"
				data-sveltekit-reload
			>
				<div class="h-8 w-10">
					<SvgIcon
						name={logoIcon}
						size="w-8 h-8"
						className="text-azure-700 dark:text-azure-500 group-hover:text-azure-900 dark:group-hover:text-azure-700 transition-colors"
					/>
				</div>
				<div class="hidden items-center justify-center gap-2 xs:flex">
					{#if title}
						<h1
							class="text-center text-sm leading-none font-semibold whitespace-nowrap text-azure-700 transition-colors group-hover:text-azure-900 lg:text-xl dark:text-azure-500 dark:group-hover:text-azure-700"
						>
							{title}
						</h1>
					{/if}
					{#if versionString}
						<p
							class="p-0.5 px-1 text-[10px] font-semibold text-gray-700 transition-colors group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white"
						>
							{versionString}
						</p>
					{/if}
				</div>
			</a>

			<!-- Header Content Section (search, buttons, etc.) -->
			<div class="flex max-w-7xl flex-1 items-center gap-2 sm:gap-4">
				{#if headerContent}
					{@render headerContent()}
				{/if}
			</div>
		</div>
	</header>

	<!-- Loading Progress Bar -->
	<div class="sticky top-14 left-0 z-20 w-full">
		<div
			class="absolute h-1 bg-azure-500 transition-all duration-300 ease-out {isFullyLoaded
				? 'opacity-0'
				: 'opacity-100'}"
			style="width: {loadingProgress}%"
		></div>
	</div>

	<!-- Main Content Area -->
	<main class="flex-1 pb-14 sm:pb-0">
		{#if children}
			{@render children()}
		{/if}
	</main>
</div>
