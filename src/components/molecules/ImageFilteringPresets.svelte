<script>
	/**
	 * ImageFilteringPresets Component
	 *
	 * Provides a visual preset selector for image filtering settings.
	 * Each preset configures: explicit_image_removal, skin_painting, and human_removal.
	 */
	import ToggleSwitch from '../atoms/ToggleSwitch.svelte';
	import Grid from './Grid.svelte';
	import OneFromMany from '../atoms/OneFromMany.svelte';
	import NamedControl from './NamedControl.svelte';
	import { CheckCircle } from '@lucide/svelte';

	let {
		// Current image_settings object from API
		// e.g., { skin_painting: "off", explicit_image_removal: "strict", human_removal: "off" }
		imageSettings = {},
		// Whether controls are disabled (e.g., during API update)
		disabled = false,
		// Callback when settings change - receives full new imageSettings object
		onChange = () => {}
	} = $props();

	// Preset configurations
	// Each preset defines what values to set for strict/moderate modes
	const presets = [
		{
			id: 'explicit_only',
			label: 'Only Block Explicit Images',
			image: '/demos/cartoon_tinypng/a.png',
			getSettings: (strict) => ({
				explicit_image_removal: strict ? 'strict' : 'moderate',
				skin_painting: 'off',
				human_removal: 'off'
			})
		},
		{
			id: 'skin_women',
			label: 'Skin Painting - Women',
			image: '/demos/cartoon_tinypng/b.png',
			getSettings: (strict) => ({
				explicit_image_removal: strict ? 'strict' : 'moderate',
				skin_painting: strict ? 'women_strict' : 'women_moderate',
				human_removal: 'off'
			})
		},
		{
			id: 'skin_all',
			label: 'Skin Painting - All People',
			image: '/demos/cartoon_tinypng/c.png',
			getSettings: (strict) => ({
				explicit_image_removal: strict ? 'strict' : 'moderate',
				skin_painting: 'all_people',
				human_removal: 'off'
			})
		},
		{
			id: 'remove_women',
			label: 'Remove Women',
			image: '/demos/cartoon_tinypng/d.png',
			getSettings: (strict) => ({
				explicit_image_removal: strict ? 'strict' : 'moderate',
				skin_painting: strict ? 'women_strict' : 'women_moderate',
				human_removal: strict ? 'women_strict' : 'women_moderate'
			})
		},
		{
			id: 'remove_women_paint_men',
			label: 'Remove Women & Paint Men',
			image: '/demos/cartoon_tinypng/e.png',
			getSettings: (strict) => ({
				explicit_image_removal: strict ? 'strict' : 'moderate',
				skin_painting: 'all_people',
				human_removal: strict ? 'women_strict' : 'women_moderate'
			})
		},
		{
			id: 'remove_all',
			label: 'Remove All People',
			image: '/demos/cartoon_tinypng/f.png',
			getSettings: (strict) => ({
				explicit_image_removal: strict ? 'strict' : 'moderate',
				skin_painting: 'all_people',
				human_removal: 'all_people'
			})
		}
	];

	const strictDetectionOptions = [
		{ value: 'strict', label: 'Strict', color: 'bg-green-alt-500' },
		{ value: 'moderate', label: 'Moderate', color: 'bg-azure-500' }
	];

	// Determine if current settings use strict mode
	// Check explicit_image_removal as the primary indicator
	const isStrict = $derived(imageSettings?.explicit_image_removal === 'strict');

	// Find which preset matches current settings
	const activePresetId = $derived.by(() => {
		if (!imageSettings) return null;

		for (const preset of presets) {
			const strictSettings = preset.getSettings(true);
			const moderateSettings = preset.getSettings(false);

			// Check if current settings match either strict or moderate version
			const matchesStrict =
				imageSettings.explicit_image_removal === strictSettings.explicit_image_removal &&
				imageSettings.skin_painting === strictSettings.skin_painting &&
				imageSettings.human_removal === strictSettings.human_removal;

			const matchesModerate =
				imageSettings.explicit_image_removal === moderateSettings.explicit_image_removal &&
				imageSettings.skin_painting === moderateSettings.skin_painting &&
				imageSettings.human_removal === moderateSettings.human_removal;

			if (matchesStrict || matchesModerate) {
				return preset.id;
			}
		}

		return null;
	});

	// Handle preset selection
	function selectPreset(preset) {
		if (disabled) return;
		const newSettings = preset.getSettings(isStrict);
		onChange(newSettings);
	}

	// Handle strict/moderate toggle
	function handleStrictToggle(newStrict) {
		if (disabled) return;

		// If there's an active preset, re-apply it with new strict setting
		if (activePresetId) {
			const activePreset = presets.find((p) => p.id === activePresetId);
			if (activePreset) {
				const newSettings = activePreset.getSettings(newStrict);
				onChange(newSettings);
				return;
			}
		}

		// Otherwise, just toggle the explicit_image_removal between strict/moderate
		// and adjust any _only -> _moderate or vice versa
		const newSettings = { ...imageSettings };
		newSettings.explicit_image_removal = newStrict ? 'strict' : 'moderate';

		// Adjust skin_painting if it has women variant
		if (newSettings.skin_painting === 'women_strict') {
			newSettings.skin_painting = newStrict ? 'women_strict' : 'women_moderate';
		} else if (newSettings.skin_painting === 'women_moderate') {
			newSettings.skin_painting = newStrict ? 'women_strict' : 'women_moderate';
		}

		// Adjust human_removal if it has women variant
		if (newSettings.human_removal === 'women_strict') {
			newSettings.human_removal = newStrict ? 'women_strict' : 'women_moderate';
		} else if (newSettings.human_removal === 'women_moderate') {
			newSettings.human_removal = newStrict ? 'women_strict' : 'women_moderate';
		}

		onChange(newSettings);
	}
</script>

<div class="w-full space-y-4">
	<!-- Detection Level -->
	<div>
		<NamedControl label="Detection Level" info={true}>
			<OneFromMany
				selected={isStrict ? 'strict' : 'moderate'}
				options={strictDetectionOptions}
				onChange={(val) => handleStrictToggle(val === 'strict')}
				{disabled}
				class="ml-4"
			/>
		</NamedControl>
	</div>

	<!-- Preset Cards Grid -->
	<Grid columns={1} columnsSm={2} columnsXl={3} gapX={1} gapY={0}>
		{#each presets as preset}
			{@const isActive = activePresetId === preset.id}
			<button
				type="button"
				class="relative mb-4 flex flex-col items-center rounded-xl border p-3 transition-all
					{isActive ? 'border-azure-500 bg-azure-50' : 'border-gray-100 hover:border-azure-200'}
					{disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}"
				onclick={() => selectPreset(preset)}
				{disabled}
			>
				<div class="mb-3 w-full overflow-hidden rounded-lg">
					<img src={preset.image} alt={preset.label} class="h-full w-full object-cover" />
				</div>
				<div class="text-center text-sm leading-tight font-medium text-gray-700">
					{preset.label}
				</div>
				{#if isActive}
					<div class="absolute bottom-2 left-2 text-azure-700">
						<CheckCircle size={24} />
					</div>
				{/if}
			</button>
		{/each}
	</Grid>
</div>
