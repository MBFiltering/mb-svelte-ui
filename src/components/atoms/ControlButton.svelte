<script>
	// Props - Svelte 5 style
	let {
		onclick = () => {},
		disabled = false,
		color = 'azure',
		size = 'md',
		type = 'button',
		className = '',
		children
	} = $props();

	// Color variants
	const colorClasses = {
		azure: 'bg-azure-500 hover:bg-azure-700 disabled:bg-gray-400 text-white',
		mulberry: 'bg-mulberry-500 hover:bg-mulberry-700 disabled:bg-gray-400 text-white',
		green: 'bg-green-alt-500 hover:bg-green-alt-600 disabled:bg-gray-400 text-white',
		orange: 'bg-orange-alt-500 hover:bg-orange-alt-600 disabled:bg-gray-400 text-white',
		red: 'bg-red-alt-500 hover:bg-red-alt-600 disabled:bg-gray-400 text-white',
		gray: 'bg-gray-500 hover:bg-neutral-600 disabled:bg-gray-400 text-white',
		black: 'bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white',
		transparent: 'bg-transparent hover:bg-gray-100 disabled:bg-gray-50 text-gray-700',
		white: 'bg-white hover:bg-gray-100 disabled:bg-gray-50 text-gray-700'
	};

	// Size variants
	const sizeClasses = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base'
	};

	const colorClass = $derived(colorClasses[color] || colorClasses.azure);
	const sizeClass = $derived(sizeClasses[size] || sizeClasses.md);
</script>

<button
	{onclick}
	{disabled}
	{type}
	class="cursor-pointer rounded-lg font-medium transition-colors disabled:cursor-default {colorClass} {sizeClass} {className}"
>
	{@render children()}
</button>
