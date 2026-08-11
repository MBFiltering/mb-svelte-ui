<script>
	/**
	 * TextLink - inline text link/button for secondary actions such as
	 * "Sign in", "Create account", "Back to sign in", or "Forgot password?".
	 *
	 * Renders an <a> when `href` is provided, otherwise a <button> (use `onclick`).
	 * Two color variants: `azure` (accent, medium weight) and `muted` (subtle gray).
	 * Pass layout/size tweaks (e.g. `text-sm`, `w-full`) via `className`.
	 *
	 * @component
	 * @example
	 * <TextLink onclick={() => goto('/auth/login')}>Sign in</TextLink>
	 * <TextLink href="/terms">Terms</TextLink>
	 * <TextLink color="muted" className="text-sm" onclick={back}>Back</TextLink>
	 */

	/**
	 * @typedef {'azure' | 'muted'} TextLinkColor
	 */

	/** @type {{ href?: string, onclick?: (() => void) | null, color?: TextLinkColor, type?: 'button' | 'submit' | 'reset', disabled?: boolean, className?: string, children: import('svelte').Snippet }} */
	let {
		href = '',
		onclick = null,
		color = 'azure',
		type = 'button',
		disabled = false,
		className = '',
		children
	} = $props();

	const colorClasses = {
		azure:
			'font-medium text-azure-700 hover:text-azure-700/80 dark:text-azure-500 dark:hover:text-azure-500/80',
		muted: 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50'
	};

	const base =
		'cursor-pointer transition-colors disabled:cursor-default disabled:opacity-50';
	const colorClass = $derived(colorClasses[color] || colorClasses.azure);
</script>

{#if href}
	<a {href} class="{base} {colorClass} {className}">{@render children()}</a>
{:else}
	<button {type} {onclick} {disabled} class="{base} {colorClass} {className}">
		{@render children()}
	</button>
{/if}
