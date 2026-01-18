<script lang="ts">
	import PresetForm from './components/PresetForm.svelte'
	import WaterGoalDisplay from './components/WaterGoalDisplay.svelte'
	import type { Preset } from './interfaces/Preset'
	import { convertToLiters } from './utils/convertToLiters'

	let waterTotal = $state(0)
	let waterToAdd = $state(0)
	let presets: Preset[] = $state([])

	const addWater = (value: number): void => {
		if (!Number.isNaN(value) && value >= 0) {
			waterTotal = +(waterTotal + convertToLiters(value)).toFixed(3)
		}
	}
</script>

<div class="relative h-dvh flex flex-col items-center justify-center">
	<h1>Hydration Tracker</h1>
	<span>{waterTotal}L / <WaterGoalDisplay /></span>

	<h2>Presets</h2>
	<div class="flex gap-2">
		{#if presets.length > 0}
			{#each presets as preset (preset.name)}
				<button class="cursor-pointer" onclick={() => addWater(preset.value)}
					>{preset.name}</button
				>
			{/each}
		{:else}
			<p>No presets found.</p>
		{/if}
	</div>

	<div class="flex gap-2">
		<label for="water-add">Water to add:</label>
		<input
			type="number"
			min="0"
			step="100"
			id="water-add"
			class="w-32"
			bind:value={waterToAdd}
			onkeydown={(e) => e.code === 'Enter' && addWater(waterToAdd)}
		/>
	</div>

	<div class="flex gap-2">
		<button class="cursor-pointer" onclick={() => addWater(waterToAdd)}>Add water</button>

		<PresetForm bind:presets {waterToAdd} />
	</div>
</div>
