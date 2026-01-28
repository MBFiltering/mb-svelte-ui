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
	<header class="sticky top-0 z-40 h-14 bg-white px-4 py-2 shadow-lg dark:bg-zinc-800">
		<div class="flex items-center justify-between gap-4">
			<!-- Logo and Title Section -->
			<div class="flex gap-4">
				<a
					href={logoHref}
					class="group h-8 w-10 cursor-pointer"
					aria-label="Home"
					data-sveltekit-reload
				>
					<SvgIcon
						name={logoIcon}
						size="w-8 h-8"
						className="text-azure-700 dark:text-azure-500 group-hover:text-azure-900 dark:group-hover:text-azure-700 transition-colors"
					/>
				</a>
				<div class="group hidden items-center justify-center gap-2 sm:flex">
					{#if title}
						<h1
							class="text-center text-sm leading-none font-semibold whitespace-nowrap text-azure-700 lg:text-xl dark:text-azure-500"
						>
							/ {title}
						</h1>
					{/if}
					{#if versionString}
						<p
							class="hidden p-0.5 px-1 text-[10px] font-semibold text-gray-700 sm:inline dark:text-gray-200"
						>
							{versionString}
						</p>
					{/if}
				</div>
			</div>

			<!-- Header Content Section (search, buttons, etc.) -->
			<div class="flex max-w-7xl flex-1 items-center gap-2 sm:gap-4">
				{#if headerContent}
					{@render headerContent()}
				{/if}
			</div>
		</div>
	</header>

	<!-- Loading Progress Bar -->
	<div class="sticky top-14 left-0 z-30 w-full">
		<div
			class="absolute h-1 bg-azure-500 transition-all duration-300 ease-out dark:bg-azure-300 {isFullyLoaded
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
