<script>
	import { Eye, EyeOff } from '@lucide/svelte';

	/**
	 * TextInput component for text and password inputs
	 * Consistent styling with focus states and optional password visibility toggle
	 */
	let {
		type = 'text',
		value = $bindable(''),
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
		size = 'md',
		variant = 'default',
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

	// Determine actual input type
	let inputType = $derived(type === 'password' && showPassword ? 'text' : type);

	// Size variants
	const sizeClasses = {
		sm: 'px-2 py-1.5 text-sm',
		md: 'px-3 py-2.5',
		lg: 'px-4 py-3 text-lg'
	};

	// Variant styles
	const variantClasses = {
		default: 'border-gray-300 bg-white focus:border-azure-700 focus:ring-azure-700/20',
		error: 'border-red-alt-500 bg-white focus:border-red-alt-500 focus:ring-red-alt-500/20',
		success: 'border-green-alt-500 bg-white focus:border-green-alt-500 focus:ring-green-alt-500/20'
	};

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

<div class="relative w-full">
	<input
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
		autocomplete={autocomplete || undefined}
		aria-label={ariaLabel || placeholder || undefined}
		{onchange}
		{oninput}
		{onkeydown}
		{onkeypress}
		{onkeyup}
		{onfocus}
		{onblur}
		class="w-full rounded-lg border text-gray-700 transition-colors focus:ring-2 focus:outline-none
			{sizeClasses[size]}
			{variantClasses[variant]}
			{type === 'password' ? 'pr-10' : ''}
			{disabled ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''}
			{readonly ? 'bg-gray-50' : ''}
			{className}"
	/>

	{#if type === 'password'}
		<button
			type="button"
			onclick={togglePasswordVisibility}
			{disabled}
			class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
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
