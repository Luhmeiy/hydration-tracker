<script lang="ts">
	import WaterGoalDisplay from './components/WaterGoalDisplay.svelte'
	import { convertToLiters } from './utils/convertToLiters'

	let waterTotal = $state(0)
	let waterToAdd = $state(0)

	const addWater = (): void => {
		waterTotal = +(waterTotal + convertToLiters(waterToAdd)).toFixed(3)
	}
</script>

<div class="h-dvh flex flex-col items-center justify-center">
	<h1>Hydration Tracker</h1>
	<span>{waterTotal}L / <WaterGoalDisplay /></span>

	<div class="flex gap-2">
		<label for="water-add">Water to add:</label>
		<input
			type="number"
			min="0"
			step="100"
			id="water-add"
			class="w-32"
			bind:value={waterToAdd}
		/>
	</div>
	<button class="cursor-pointer" onclick={addWater}>Add water</button>
</div>
