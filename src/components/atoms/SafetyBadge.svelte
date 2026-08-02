<script>
	/**
	 * SafetyBadge - A reusable component for displaying safety/risk level badges
	 *
	 * Shows Trusted/Caution/Risk/Danger/Unknown labels with appropriate colors
	 * Can accept either a colorKey directly or derive it from a category label
	 */

	import {
		labelToColorKey,
		riskLabelMap,
		colorClasses,
		deriveColorKeyFromLabel,
		getRiskLabel
	} from '../../utils/categoryColors.js';
	import { registerTranslations, t } from '../../utils/i18n/i18n.js';
	import { safetyTranslations, colorKeyToSafetyKey } from '../../utils/i18n/safetyTranslations.js';

	// Register the shared safety vocabulary so the badge is localized out of the
	// box. Runs once on module load; consumer overrides still win via deepMerge.
	registerTranslations(safetyTranslations);

	let {
		colorKey = '', // Direct color key: 'green', 'yellow', 'orange', 'red', 'gray'
		label = '', // Optional: category label to derive color from
		riskLabelOverride = '', // Optional: Override the risk label text (for i18n)
		showLabel = true, // Whether to show the risk label text
		size = 'sm', // Size variant: 'xs', 'sm', 'md'
		className = '' // Additional CSS classes
	} = $props();

	// Size classes
	const sizeClasses = {
		xs: 'px-1.5 py-0.5 text-[10px]',
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-1 text-sm'
	};

	// Derive color key from label if not provided directly
	function resolveColorKey(providedKey, categoryLabel) {
		if (providedKey && providedKey !== 'gray') {
			return providedKey;
		}
		if (categoryLabel) {
			return deriveColorKeyFromLabel(categoryLabel);
		}
		return providedKey || 'gray';
	}

	// Computed values
	const resolvedColorKey = $derived(resolveColorKey(colorKey, label));
	// Localized risk label via the shared i18n engine; an explicit override still
	// wins, and if the key is somehow unregistered we fall back to the English map.
	const riskLabel = $derived(
		riskLabelOverride ||
			$t(`safety.${colorKeyToSafetyKey[resolvedColorKey] || 'unknown'}`) ||
			getRiskLabel(resolvedColorKey)
	);
	const badgeClasses = $derived(
		`g2 rounded-lg border font-semibold ${colorClasses[resolvedColorKey] || colorClasses.gray} ${sizeClasses[size] || sizeClasses.sm} ${className}`
	);
</script>

{#if showLabel}
	<span class={badgeClasses}>{riskLabel}</span>
{/if}
