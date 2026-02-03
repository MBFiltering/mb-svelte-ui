<script>
	import { Eye, EyeOff, Search } from '@lucide/svelte';

	/**
	 * TextInput component for text, password, number, date inputs, and textareas
	 * Consistent styling with focus states and optional password visibility toggle
	 */
	let {
		type = 'text',
		value = $bindable(''),
		ref = $bindable(null),
		placeholder = '',
		disabled = false,
		id = '',
		name = '',
		ariaLabel = '',
		autocomplete = '',
		required = false,
		readonly = false,
		maxlength = undefined,
		minlength = undefined,
		pattern = undefined,
		min = undefined,
		max = undefined,
		step = undefined,
		rows = 4,
		size = 'md',
		variant = 'default',
		showSearchIcon = false,
		className = '',
		onchange = () => {},
		oninput = () => {},
		onkeydown = () => {},
		onkeypress = () => {},
		onkeyup = () => {},
		onfocus = () => {},
		onblur = () => {}
	} = $props();

	// For password visibility toggle
	let showPassword = $state(false);

	// Determine if this is a textarea
	let isTextarea = $derived(type === 'textarea');

	// Determine actual input type (for password toggle)
	let inputType = $derived(type === 'password' && showPassword ? 'text' : type);

	// Size variants - base padding (adjusted for icons)
	const sizeClasses = {
		sm: 'py-1.5 text-sm',
		md: 'py-2.5',
		lg: 'py-3 text-lg'
	};

	// Horizontal padding based on size and icons
	const paddingClasses = $derived.by(() => {
		const leftPadding = showSearchIcon
			? 'ps-9'
			: size === 'sm'
				? 'ps-2'
				: size === 'lg'
					? 'ps-4'
					: 'ps-3';
		const rightPadding =
			type === 'password' ? 'pe-10' : size === 'sm' ? 'pe-2' : size === 'lg' ? 'pe-4' : 'pe-3';
		return `${leftPadding} ${rightPadding}`;
	});

	// Variant styles
	const variantClasses = {
		default:
			'border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 focus:border-azure-700 focus:ring-azure-700/20 dark:focus:border-azure-500 dark:focus:ring-azure-500/20',
		error:
			'border-red-alt-500 bg-white dark:bg-zinc-800 focus:border-red-alt-500 focus:ring-red-alt-500/20',
		success:
			'border-green-alt-500 bg-white dark:bg-zinc-800 focus:border-green-alt-500 focus:ring-green-alt-500/20'
	};

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	// Common classes for both input and textarea
	const baseClasses = $derived(
		`w-full rounded-lg border text-gray-700 transition-colors focus:ring-2 focus:outline-none dark:text-gray-200 ${sizeClasses[size]} ${paddingClasses} ${variantClasses[variant]} ${disabled ? 'cursor-not-allowed bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400' : ''} ${readonly ? 'bg-gray-50 dark:bg-gray-900' : ''} ${className}`
	);

	// Search icon size based on input size
	const searchIconSize = $derived(size === 'sm' ? 16 : size === 'lg' ? 22 : 20);
</script>

<div class="group relative w-full">
	{#if showSearchIcon}
		<div
			class="pointer-events-none absolute top-1/2 ltr:left-3 rtl:right-3 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-azure-700 dark:text-gray-500 dark:group-focus-within:text-azure-500"
		>
			<Search size={searchIconSize} strokeWidth={2} />
		</div>
	{/if}

	{#if isTextarea}
		<textarea
			bind:value
			{placeholder}
			{disabled}
			{id}
			{name}
			{required}
			{readonly}
			{maxlength}
			{minlength}
			{rows}
			aria-label={ariaLabel || placeholder || undefined}
			{onchange}
			{oninput}
			{onkeydown}
			{onkeypress}
			{onkeyup}
			{onfocus}
			{onblur}
			class={baseClasses}
		></textarea>
	{:else}
		<input
			bind:this={ref}
			type={inputType}
			bind:value
			{placeholder}
			{disabled}
			{id}
			{name}
			{required}
			{readonly}
			{maxlength}
			{minlength}
			{pattern}
			{min}
			{max}
			{step}
			autocomplete={autocomplete || undefined}
			aria-label={ariaLabel || placeholder || undefined}
			{onchange}
			{oninput}
			{onkeydown}
			{onkeypress}
			{onkeyup}
			{onfocus}
			{onblur}
			class={baseClasses}
		/>
	{/if}

	{#if type === 'password'}
		<button
			type="button"
			onclick={togglePasswordVisibility}
			{disabled}
			class="absolute top-1/2 rtl:left-3 ltr:right-3 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-600 dark:hover:text-gray-400"
			aria-label={showPassword ? 'Hide password' : 'Show password'}
			tabindex="-1"
		>
			{#if showPassword}
				<EyeOff size={18} />
			{:else}
				<Eye size={18} />
			{/if}
		</button>
	{/if}
</div>
