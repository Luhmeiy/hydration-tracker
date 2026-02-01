<script lang="ts">
	import type { Preset } from '$interfaces/Preset'
	import Button from './Button.svelte'
	import EditPresets from './EditPresets.svelte'

	interface PresetSectionProps {
		addWater: (value: number) => Promise<void>
		errorMessage: string | null
		presets: Preset[]
	}

	let {
		errorMessage = $bindable(),
		presets = $bindable(),
		addWater
	}: PresetSectionProps = $props()

	let isEditPreset = $state(false)
</script>

<EditPresets bind:isEditPreset bind:presets bind:errorMessage />

<section class="flex flex-col items-center gap-1">
	<h2 class="font-bold">Presets</h2>
	<div class="flex justify-center flex-wrap gap-2">
		{#if presets.length > 0}
			{#each presets as preset (preset.name)}
				<Button action={() => addWater(preset.value)} text={preset.name} />
			{/each}
		{:else}
			<p>No presets found.</p>
		{/if}
	</div>

	{#if presets.length > 0}
		<button
			class="underline cursor-pointer hover:text-darkblue-hover active:text-darkblue-active"
			onclick={() => (isEditPreset = true)}
		>
			Edit presets
		</button>
	{/if}
</section>
