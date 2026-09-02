<script>
	import { Eye, EyeOff, Search } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import FieldError from './FieldError.svelte';
	import { firstError } from '../../utils/fieldError.js';

	/**
	 * TextInput component for text, password, number, date inputs, and textareas
	 * Consistent styling with focus states and optional password visibility toggle.
	 *
	 * Field errors belong here, not in a toast. `error` accepts a string or a
	 * superforms `string[]` and shows the first message under the control.
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
		inputmode = undefined,
		autofocus = false,
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
		label = '',
		hint = '',
		textInfo = '',
		// Error state. `error` is the message; `invalid` / `describedBy` remain
		// for callers that render the message themselves (e.g. Field).
		error = undefined,
		invalid = undefined,
		describedBy = undefined,
		// Accessible names for the password visibility toggle. Host apps pass
		// translations; the English defaults keep existing call sites working.
		showPasswordLabel = 'Show password',
		hidePasswordLabel = 'Hide password',
		onchange = () => {},
		oninput = () => {},
		onkeydown = () => {},
		onkeypress = () => {},
		onkeyup = () => {},
		onfocus = () => {},
		onblur = () => {}
	} = $props();

	const uid = $props.id();
	const errorId = `text-input-error-${uid}`;
	const inputId = $derived(id || (label ? `text-input-${uid}` : ''));
	const message = $derived(firstError(error));
	const helper = $derived(hint || textInfo);
	const isInvalid = $derived(Boolean(invalid) || Boolean(message) || variant === 'error');
	const effectiveVariant = $derived(message || invalid ? 'error' : variant);
	const errorDescribedBy = $derived(message ? errorId : undefined);
	const combinedDescribedBy = $derived(
		[describedBy, errorDescribedBy].filter(Boolean).join(' ') || undefined
	);
	// A visible label already names the control. aria-label would override it.
	const effectiveAriaLabel = $derived(
		ariaLabel || (label ? undefined : placeholder || undefined)
	);

	// Programmatic autofocus (avoids the native `autofocus` attribute, which
	// Svelte flags for a11y — focusing on mount is the accepted pattern and
	// only runs in the browser).
	onMount(() => {
		if (autofocus) ref?.focus();
	});

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

	// Common classes for both input and textarea.
	//
	// The placeholder colour is set explicitly rather than left to Tailwind's
	// preflight, which resolves `::placeholder` to `currentColor` at 50% — i.e.
	// a tint of the *typed* colour, which lands too close to it to read as
	// "not yet filled in". Pinning it moves it away from the text in both
	// themes: lighter than gray-400 on white, and down to gray-500 on the dark
	// surface, where a 50% tint of gray-200 was nearly as bright as real input.
	const baseClasses = $derived(
		`g2 w-full rounded-lg border text-gray-700 placeholder-gray-400/80 transition-colors focus:ring-2 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500 ${sizeClasses[size] ?? sizeClasses.md} ${paddingClasses} ${variantClasses[effectiveVariant] ?? variantClasses.default} ${disabled ? 'cursor-not-allowed bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400' : ''} ${readonly ? 'bg-gray-50 dark:bg-gray-900' : ''} ${className}`
	);

	// Search icon size based on input size
	const searchIconSize = $derived(size === 'sm' ? 16 : size === 'lg' ? 22 : 20);
</script>

<div class="w-full">
	{#if label}
		<label
			for={inputId}
			class="mb-2 block text-[14px] text-gray-700 dark:text-gray-200"
		>
			{label}
		</label>
	{/if}

	<div class="group relative w-full">
		{#if showSearchIcon}
			<div
				class="pointer-events-none absolute top-1/2 ltr:left-3 rtl:right-3 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-azure-700 dark:text-gray-500 dark:group-focus-within:text-azure-500"
			>
				<Search size={searchIconSize} strokeWidth={2} aria-hidden="true" />
			</div>
		{/if}

		{#if isTextarea}
			<textarea
				bind:value
				{placeholder}
				{disabled}
				id={inputId || undefined}
				{name}
				{required}
				{readonly}
				{maxlength}
				{minlength}
				{inputmode}
				{rows}
				aria-label={effectiveAriaLabel}
				aria-invalid={isInvalid || undefined}
				aria-describedby={combinedDescribedBy}
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
				id={inputId || undefined}
				{name}
				{required}
				{readonly}
				{maxlength}
				{minlength}
				{pattern}
				{min}
				{max}
				{step}
				{inputmode}
				autocomplete={autocomplete || undefined}
				aria-label={effectiveAriaLabel}
				aria-invalid={isInvalid || undefined}
				aria-describedby={combinedDescribedBy}
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
				aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
				aria-pressed={showPassword}
			>
				{#if showPassword}
					<EyeOff size={18} aria-hidden="true" />
				{:else}
					<Eye size={18} aria-hidden="true" />
				{/if}
			</button>
		{/if}
	</div>

	{#if message}
		<FieldError id={errorId} {message} className="mt-1.5" />
	{:else if helper}
		<p class="mt-1.5 text-xs text-gray-600 dark:text-gray-300">{helper}</p>
	{/if}
</div>
