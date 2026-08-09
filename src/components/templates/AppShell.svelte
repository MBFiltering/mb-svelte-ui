<script>
	import SvgIcon from '../atoms/SvgIcon.svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import HeaderNav from '../molecules/HeaderNav.svelte';

	/**
	 * AppShell - Full page layout template.
	 *
	 * The header answers "who am I signed in as", the footer answers "what is
	 * this product" — deliberately two places, because the header used to carry
	 * whichever of the two an app happened to pass and the portals drifted apart
	 * over it.
	 *
	 * Includes:
	 * - Sticky header: account chip (avatar + name), app content, nav
	 * - Optional loading progress bar
	 * - Main content area
	 * - Faded brand footer with the product name and version
	 */
	let {
		// Account chip (header, start side)
		userName = '',
		userHref = '/dashboard',
		homeLabel = 'Home',

		// Nav (header, end side) — see HeaderNav for the NavItem shape
		navItems = [],
		menuLabel = 'Menu',

		// Brand (footer)
		productName = '',
		brandIcon = 'mbsmart-logo',
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
			<!-- Account chip: who is signed in, and the way home -->
			<a
				href={userHref}
				class="group flex min-w-0 items-center gap-2.5"
				aria-label={homeLabel}
				data-sveltekit-reload
			>
				<Avatar
					className="transition-colors group-hover:bg-azure-200 dark:group-hover:bg-azure-800"
				/>
				{#if userName}
					<span
						class="truncate text-sm leading-none font-semibold text-azure-700 transition-colors group-hover:text-azure-900 lg:text-base dark:text-azure-500 dark:group-hover:text-azure-700"
					>
						{userName}
					</span>
				{/if}
			</a>

			<!-- App content (search and the like), then the nav -->
			<div class="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4">
				{#if headerContent}
					{@render headerContent()}
				{/if}
				<HeaderNav items={navItems} {menuLabel} />
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
	<main class="flex-1">
		{#if children}
			{@render children()}
		{/if}
	</main>

	<!-- Brand Footer: faded, in-flow, the way a copyright line sits -->
	{#if productName}
		<footer
			class="flex select-none items-center justify-center gap-2 px-4 py-6 text-gray-900/40 dark:text-gray-50/35"
		>
			<SvgIcon name={brandIcon} size="w-4 h-4" className="shrink-0" />
			<p class="text-xs font-medium">
				{productName}{versionString ? ` · ${versionString}` : ''}
			</p>
		</footer>
	{/if}
</div>
