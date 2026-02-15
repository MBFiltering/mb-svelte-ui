<script>
	import { playSound } from '../../utils/playSound.js';

	// Props - Svelte 5 style
	let {
		onclick = () => {},
		sound = null,
		disabled = false,
		title = '',
		type = 'button',
		color = 'ghost',
		size = 'md',
		icon,
		iconSize = 18,
		className = ''
	} = $props();

	// Color variants
	const colorClasses = {
		ghost: 'text-gray-700 hover:bg-gray-900/10 dark:text-gray-200 dark:hover:bg-gray-50/10',
		ghost2: 'text-gray-500 hover:bg-gray-900/10 dark:text-gray-400 dark:hover:bg-gray-50/10',
		azure: 'bg-azure-700 text-white hover:bg-azure-900 dark:bg-azure-500 dark:hover:bg-azure-700',
		green: 'bg-green-alt-500 text-white hover:bg-green-alt-600',
		red: 'bg-red-alt-500 text-white hover:bg-red-alt-600',
		orange: 'bg-orange-alt-500 text-white hover:bg-orange-alt-600',
		gray: 'bg-gray-500 text-white hover:bg-neutral-600'
	};

	// Size variants (padding)
	const sizeClasses = {
		sm: 'p-1.5',
		md: 'p-2',
		lg: 'p-3'
	};

	const colorClass = $derived(colorClasses[color] || colorClasses.ghost);
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
	{title}
	{type}
	class="cursor-pointer rounded-full transition-colors disabled:cursor-default disabled:opacity-50 {colorClass} {sizeClass} {className}"
>
	<svelte:component this={icon} size={iconSize} />
</button>
