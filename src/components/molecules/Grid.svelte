<script>
	/**
	 * Grid Component
	 *
	 * A responsive grid wrapper supporting two flow modes:
	 * - 'row' (default): Standard grid that fills rows first (left-to-right, then top-to-bottom)
	 * - 'col': Column-first grid that fills columns first (top-to-bottom, then left-to-right)
	 *
	 * For 'col' mode, rows are dynamically calculated based on itemCount and column settings.
	 */

	let {
		// Flow direction: 'row' (standard) or 'col' (column-first, requires itemCount)
		flow = 'row',
		// Number of items - required for 'col' flow to calculate rows
		itemCount = 0,
		// Column counts at different breakpoints (default = base/mobile)
		columns = 1,
		columnsSm = null, // 640px+
		columnsMd = null, // 768px+
		columnsLg = null, // 1024px+
		columnsXl = null, // 1280px+
		columns2Xl = null, // 1536px+
		// Gap between items (in rem, e.g., 1 = 1rem = 16px)
		gapX = 2, // Override horizontal gap
		gapY = 0, // Override vertical gap
		// Disable grid layout entirely (render as normal flow)
		disabled = false,
		// Additional classes
		className = '',
		// Content
		children
	} = $props();

	// Calculate rows for column-first flow
	const rows = $derived(Math.ceil(itemCount / columns) || 1);
	const rowsSm = $derived(columnsSm ? Math.ceil(itemCount / columnsSm) : null);
	const rowsMd = $derived(columnsMd ? Math.ceil(itemCount / columnsMd) : null);
	const rowsLg = $derived(columnsLg ? Math.ceil(itemCount / columnsLg) : null);
	const rowsXl = $derived(columnsXl ? Math.ceil(itemCount / columnsXl) : null);
	const rows2Xl = $derived(columns2Xl ? Math.ceil(itemCount / columns2Xl) : null);

	// Build CSS variables for all grid properties
	const cssVariables = $derived.by(() => {
		const vars = [];

		// Base columns
		vars.push(`--grid-cols: ${columns}`);

		// Responsive columns
		if (columnsSm !== null) vars.push(`--grid-cols-sm: ${columnsSm}`);
		if (columnsMd !== null) vars.push(`--grid-cols-md: ${columnsMd}`);
		if (columnsLg !== null) vars.push(`--grid-cols-lg: ${columnsLg}`);
		if (columnsXl !== null) vars.push(`--grid-cols-xl: ${columnsXl}`);
		if (columns2Xl !== null) vars.push(`--grid-cols-2xl: ${columns2Xl}`);

		// Rows for column-first flow
		if (flow === 'col') {
			vars.push(`--grid-rows: ${rows}`);
			if (rowsSm !== null) vars.push(`--grid-rows-sm: ${rowsSm}`);
			if (rowsMd !== null) vars.push(`--grid-rows-md: ${rowsMd}`);
			if (rowsLg !== null) vars.push(`--grid-rows-lg: ${rowsLg}`);
			if (rowsXl !== null) vars.push(`--grid-rows-xl: ${rowsXl}`);
			if (rows2Xl !== null) vars.push(`--grid-rows-2xl: ${rows2Xl}`);
		}

		// Gap values
		vars.push(`--grid-gap-x: ${gapX}rem`);
		vars.push(`--grid-gap-y: ${gapY}rem`);

		return vars.join('; ');
	});

	// Determine responsive modifier classes
	const responsiveClasses = $derived.by(() => {
		const classes = ['grid-component'];
		if (flow === 'col') classes.push('flow-col');
		if (columnsSm !== null) classes.push('has-sm');
		if (columnsMd !== null) classes.push('has-md');
		if (columnsLg !== null) classes.push('has-lg');
		if (columnsXl !== null) classes.push('has-xl');
		if (columns2Xl !== null) classes.push('has-2xl');
		return classes.join(' ');
	});

	// Combine with user's className
	const finalClasses = $derived(
		className ? `${responsiveClasses} ${className}` : responsiveClasses
	);
</script>

{#if disabled}
	<div class={className}>
		{@render children?.()}
	</div>
{:else}
	<div class={finalClasses} style={cssVariables}>
		{@render children?.()}
	</div>
{/if}

<style>
	/* Base grid styles */
	.grid-component {
		display: grid;
		grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr));
		gap: var(--grid-gap-y) var(--grid-gap-x);
	}

	/* Column-first flow */
	.grid-component.flow-col {
		grid-auto-flow: column;
		grid-template-rows: repeat(var(--grid-rows), minmax(0, 1fr));
	}

	/* For screens smaller than sm (640px), disable grid and use normal flow */
	@media (max-width: 639px) {
		.grid-component {
			display: block;
		}
	}

	/* sm: 640px+ */
	@media (min-width: 640px) {
		.grid-component.has-sm {
			grid-template-columns: repeat(var(--grid-cols-sm), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-sm {
			grid-template-rows: repeat(var(--grid-rows-sm), minmax(0, 1fr));
		}
	}

	/* md: 768px+ */
	@media (min-width: 768px) {
		.grid-component.has-md {
			grid-template-columns: repeat(var(--grid-cols-md), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-md {
			grid-template-rows: repeat(var(--grid-rows-md), minmax(0, 1fr));
		}
	}

	/* lg: 1024px+ */
	@media (min-width: 1024px) {
		.grid-component.has-lg {
			grid-template-columns: repeat(var(--grid-cols-lg), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-lg {
			grid-template-rows: repeat(var(--grid-rows-lg), minmax(0, 1fr));
		}
	}

	/* xl: 1280px+ */
	@media (min-width: 1280px) {
		.grid-component.has-xl {
			grid-template-columns: repeat(var(--grid-cols-xl), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-xl {
			grid-template-rows: repeat(var(--grid-rows-xl), minmax(0, 1fr));
		}
	}

	/* 2xl: 1536px+ */
	@media (min-width: 1536px) {
		.grid-component.has-2xl {
			grid-template-columns: repeat(var(--grid-cols-2xl), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-2xl {
			grid-template-rows: repeat(var(--grid-rows-2xl), minmax(0, 1fr));
		}
	}
</style>
