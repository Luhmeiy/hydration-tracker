<script lang="ts">
	import PresetForm from './components/PresetForm.svelte'
	import UnitSelect from './components/UnitSelect.svelte'
	import WaterDisplay from './components/WaterDisplay.svelte'
	import WaterGoalDisplay from './components/WaterGoalDisplay.svelte'
	import type { Preset } from './interfaces/Preset'
	import type { Unit } from './interfaces/Unit'

	let unit: Unit = $state('L')
	let presets: Preset[] = $state([])

	let waterGoal = $state(2500)
	let waterTotal = $state(0)
	let waterToAdd = $state(0)

	const addWater = (value: number): void => {
		if (Number.isNaN(value) || value <= 0) return

		waterTotal += value
	}
</script>

<div class="relative h-dvh flex flex-col items-center justify-center">
	<h1>Hydration Tracker</h1>
	<span>
		<WaterDisplay {unit} water={waterTotal} /> / <WaterGoalDisplay bind:waterGoal {unit} />
	</span>

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
		<label for="water-add">Water to add (in mL):</label>
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

	<UnitSelect bind:unit />
</div>
