<script>
	/**
	 * Custom RadioButton component with azure-700 styling
	 * Works like a real radio button under the hood for accessibility
	 */
	let {
		checked = false,
		disabled = false,
		name = '',
		value = '',
		ariaLabel = '',
		onchange = () => {}
	} = $props();
</script>

<label
	class="relative inline-flex cursor-pointer items-center {disabled
		? 'cursor-default opacity-50'
		: ''}"
>
	<!-- Hidden native radio for accessibility -->
	<input
		type="radio"
		{checked}
		{disabled}
		{name}
		{value}
		aria-label={ariaLabel}
		onchange={(e) => {
			if (!disabled) {
				onchange(e);
			}
		}}
		class="peer absolute h-0 w-0 opacity-0"
	/>
	<!-- Custom radio visual -->
	<div
		class="flex h-5 w-5 items-center justify-center rounded-full border transition-colors
			{checked ? 'border-azure-700 bg-white' : 'border-gray-300 bg-white hover:border-azure-500'}"
	>
		{#if checked}
			<div class="h-2.5 w-2.5 rounded-full bg-azure-700"></div>
		{/if}
	</div>
</label>
