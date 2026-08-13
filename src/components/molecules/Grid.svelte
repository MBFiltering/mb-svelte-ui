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
		columnsSm2 = null, // 700px+
		columnsMd = null, // 768px+
		columnsMd2 = null, // 850px+
		columnsLg = null, // 1024px+
		columnsLg2 = null, // 1150px+
		columnsXl = null, // 1280px+
		columnsXl2 = null, // 1440px+
		columns2Xl = null, // 1536px+
		columns2Xl2 = null, // 1650px+
		columns3Xl = null, // 1920px+
		columns3Xl2 = null, // 2100px+
		// Gap between items (in rem, e.g., 1 = 1rem = 16px)
		gapX = 2, // Override horizontal gap
		gapY = 0, // Override vertical gap
		// Disable grid layout entirely (render as normal flow)
		disabled = false,
		// Additional classes
		className = '',
		// Content
		children = undefined
	} = $props();

	// Calculate rows for column-first flow
	const rows = $derived(Math.ceil(itemCount / columns) || 1);
	const rowsSm = $derived(columnsSm ? Math.ceil(itemCount / columnsSm) : null);
	const rowsSm2 = $derived(columnsSm2 ? Math.ceil(itemCount / columnsSm2) : null);
	const rowsMd = $derived(columnsMd ? Math.ceil(itemCount / columnsMd) : null);
	const rowsMd2 = $derived(columnsMd2 ? Math.ceil(itemCount / columnsMd2) : null);
	const rowsLg = $derived(columnsLg ? Math.ceil(itemCount / columnsLg) : null);
	const rowsLg2 = $derived(columnsLg2 ? Math.ceil(itemCount / columnsLg2) : null);
	const rowsXl = $derived(columnsXl ? Math.ceil(itemCount / columnsXl) : null);
	const rowsXl2 = $derived(columnsXl2 ? Math.ceil(itemCount / columnsXl2) : null);
	const rows2Xl = $derived(columns2Xl ? Math.ceil(itemCount / columns2Xl) : null);
	const rows2Xl2 = $derived(columns2Xl2 ? Math.ceil(itemCount / columns2Xl2) : null);
	const rows3Xl = $derived(columns3Xl ? Math.ceil(itemCount / columns3Xl) : null);
	const rows3Xl2 = $derived(columns3Xl2 ? Math.ceil(itemCount / columns3Xl2) : null);

	// Build CSS variables for all grid properties
	const cssVariables = $derived.by(() => {
		const vars = [];

		// Base columns
		vars.push(`--grid-cols: ${columns}`);

		// Responsive columns
		if (columnsSm !== null) vars.push(`--grid-cols-sm: ${columnsSm}`);
		if (columnsSm2 !== null) vars.push(`--grid-cols-sm2: ${columnsSm2}`);
		if (columnsMd !== null) vars.push(`--grid-cols-md: ${columnsMd}`);
		if (columnsMd2 !== null) vars.push(`--grid-cols-md2: ${columnsMd2}`);
		if (columnsLg !== null) vars.push(`--grid-cols-lg: ${columnsLg}`);
		if (columnsLg2 !== null) vars.push(`--grid-cols-lg2: ${columnsLg2}`);
		if (columnsXl !== null) vars.push(`--grid-cols-xl: ${columnsXl}`);
		if (columnsXl2 !== null) vars.push(`--grid-cols-xl2: ${columnsXl2}`);
		if (columns2Xl !== null) vars.push(`--grid-cols-2xl: ${columns2Xl}`);
		if (columns2Xl2 !== null) vars.push(`--grid-cols-2xl2: ${columns2Xl2}`);
		if (columns3Xl !== null) vars.push(`--grid-cols-3xl: ${columns3Xl}`);
		if (columns3Xl2 !== null) vars.push(`--grid-cols-3xl2: ${columns3Xl2}`);

		// Rows for column-first flow
		if (flow === 'col') {
			vars.push(`--grid-rows: ${rows}`);
			if (rowsSm !== null) vars.push(`--grid-rows-sm: ${rowsSm}`);
			if (rowsSm2 !== null) vars.push(`--grid-rows-sm2: ${rowsSm2}`);
			if (rowsMd !== null) vars.push(`--grid-rows-md: ${rowsMd}`);
			if (rowsMd2 !== null) vars.push(`--grid-rows-md2: ${rowsMd2}`);
			if (rowsLg !== null) vars.push(`--grid-rows-lg: ${rowsLg}`);
			if (rowsLg2 !== null) vars.push(`--grid-rows-lg2: ${rowsLg2}`);
			if (rowsXl !== null) vars.push(`--grid-rows-xl: ${rowsXl}`);
			if (rowsXl2 !== null) vars.push(`--grid-rows-xl2: ${rowsXl2}`);
			if (rows2Xl !== null) vars.push(`--grid-rows-2xl: ${rows2Xl}`);
			if (rows2Xl2 !== null) vars.push(`--grid-rows-2xl2: ${rows2Xl2}`);
			if (rows3Xl !== null) vars.push(`--grid-rows-3xl: ${rows3Xl}`);
			if (rows3Xl2 !== null) vars.push(`--grid-rows-3xl2: ${rows3Xl2}`);
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
		if (columnsSm2 !== null) classes.push('has-sm2');
		if (columnsMd !== null) classes.push('has-md');
		if (columnsMd2 !== null) classes.push('has-md2');
		if (columnsLg !== null) classes.push('has-lg');
		if (columnsLg2 !== null) classes.push('has-lg2');
		if (columnsXl !== null) classes.push('has-xl');
		if (columnsXl2 !== null) classes.push('has-xl2');
		if (columns2Xl !== null) classes.push('has-2xl');
		if (columns2Xl2 !== null) classes.push('has-2xl2');
		if (columns3Xl !== null) classes.push('has-3xl');
		if (columns3Xl2 !== null) classes.push('has-3xl2');
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

	/* sm2: 700px+ */
	@media (min-width: 700px) {
		.grid-component.has-sm2 {
			grid-template-columns: repeat(var(--grid-cols-sm2), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-sm2 {
			grid-template-rows: repeat(var(--grid-rows-sm2), minmax(0, 1fr));
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

	/* md2: 850px+ */
	@media (min-width: 850px) {
		.grid-component.has-md2 {
			grid-template-columns: repeat(var(--grid-cols-md2), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-md2 {
			grid-template-rows: repeat(var(--grid-rows-md2), minmax(0, 1fr));
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

	/* lg2: 1150px+ */
	@media (min-width: 1150px) {
		.grid-component.has-lg2 {
			grid-template-columns: repeat(var(--grid-cols-lg2), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-lg2 {
			grid-template-rows: repeat(var(--grid-rows-lg2), minmax(0, 1fr));
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

	/* xl2: 1440px+ */
	@media (min-width: 1440px) {
		.grid-component.has-xl2 {
			grid-template-columns: repeat(var(--grid-cols-xl2), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-xl2 {
			grid-template-rows: repeat(var(--grid-rows-xl2), minmax(0, 1fr));
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

	/* 2xl2: 1650px+ */
	@media (min-width: 1650px) {
		.grid-component.has-2xl2 {
			grid-template-columns: repeat(var(--grid-cols-2xl2), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-2xl2 {
			grid-template-rows: repeat(var(--grid-rows-2xl2), minmax(0, 1fr));
		}
	}

	/* 3xl: 1920px+ */
	@media (min-width: 1920px) {
		.grid-component.has-3xl {
			grid-template-columns: repeat(var(--grid-cols-3xl), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-3xl {
			grid-template-rows: repeat(var(--grid-rows-3xl), minmax(0, 1fr));
		}
	}

	/* 3xl2: 2100px+ */
	@media (min-width: 2100px) {
		.grid-component.has-3xl2 {
			grid-template-columns: repeat(var(--grid-cols-3xl2), minmax(0, 1fr));
		}
		.grid-component.flow-col.has-3xl2 {
			grid-template-rows: repeat(var(--grid-rows-3xl2), minmax(0, 1fr));
		}
	}
</style>
