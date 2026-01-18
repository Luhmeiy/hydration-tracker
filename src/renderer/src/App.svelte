<script lang="ts">
	let waterTotal = $state(0)
	let waterToAdd = $state(0)

	const convertToLiters = (): number => {
		return waterToAdd / 1000
	}

	const addWater = (): void => {
		waterTotal = +(waterTotal + convertToLiters()).toFixed(3)
	}
</script>

<div class="h-dvh flex flex-col items-center justify-center">
	<h1>Hydration Tracker</h1>
	<span>{waterTotal}L / 2.5L</span>

	<div class="flex gap-2">
		<label for="water">Water to add:</label>
		<input type="number" id="water" class="w-32" bind:value={waterToAdd} />
	</div>
	<button class="cursor-pointer" onclick={addWater}>Add water</button>
</div>
