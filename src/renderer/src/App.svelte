<script lang="ts">
	import WaterGoalDisplay from './components/WaterGoalDisplay.svelte'
	import { convertToLiters } from './utils/convertToLiters'

	interface Preset {
		name: string
		value: number
	}

	let waterTotal = $state(0)
	let waterToAdd = $state(0)
	let presets: Preset[] = $state([])

	let presetName = $state('')
	let isAddingPreset = $state(false)

	const addWater = (value: number): void => {
		if (!Number.isNaN(value) && value >= 0) {
			waterTotal = +(waterTotal + convertToLiters(value)).toFixed(3)
		}
	}

	const addPreset = (): void => {
		if (!Number.isNaN(waterToAdd) && waterToAdd > 0) {
			presets = [...presets, { name: presetName, value: waterToAdd }]
		}

		presetName = ''
		isAddingPreset = false
	}

	const handleKeydown = (e: KeyboardEvent): void => {
		if (e.key === 'Enter') {
			addPreset()
		} else if (e.key === 'Escape') {
			isAddingPreset = false
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
		<button class="cursor-pointer" onclick={() => (isAddingPreset = true)}>Add as preset</button
		>
	</div>

	{#if isAddingPreset}
		<div class="absolute bg-white self-center">
			<button
				class="absolute right-1 top-1 cursor-pointer"
				onclick={() => (isAddingPreset = false)}>x</button
			>

			<div class="flex flex-col gap-2">
				<label for="preset-add">Preset name:</label>
				<input
					type="text"
					id="preset-add"
					class="w-32"
					bind:value={presetName}
					onkeydown={handleKeydown}
				/>
			</div>

			<button onclick={addPreset}>Add preset</button>
		</div>
	{/if}
</div>
