<script>
	import { playSound } from '../../utils/playSound.js';

	// Props - Svelte 5 style
	let {
		onclick = () => {},
		sound = null,
		disabled = false,
		color = 'azure',
		size = 'md',
		type = 'button',
		className = '',
		children
	} = $props();

	// Color variants
	const colorClasses = {
		azure: 'bg-azure-700 hover:bg-azure-900 dark:bg-azure-500 dark:hover:bg-azure-700',
		green: 'bg-green-alt-500 hover:bg-green-alt-600',
		orange: 'bg-orange-alt-500 hover:bg-orange-alt-600',
		red: 'bg-red-alt-500 hover:bg-red-alt-600',
		gray: 'bg-gray-500 hover:bg-neutral-600'
	};

	// Size variants
	const sizeClasses = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base'
	};

	const colorClass = $derived(colorClasses[color] || colorClasses.azure);
	const sizeClass = $derived(sizeClasses[size] || sizeClasses.md);

	function handleClick(event) {
		if (disabled) return;
		playSound(sound);
		onclick(event);
	}
</script>

<button
	onclick={handleClick}
	{disabled}
	{type}
	class="cursor-pointer rounded-lg font-medium text-white transition-colors disabled:cursor-default disabled:bg-gray-400 {colorClass} {sizeClass} {className}"
>
	{@render children()}
</button>
