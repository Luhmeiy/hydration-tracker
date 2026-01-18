<script lang="ts">
	import type { Unit } from '../interfaces/Unit'
	import WaterDisplay from './WaterDisplay.svelte'

	let { waterGoal = $bindable(), unit }: { waterGoal: number; unit: Unit } = $props()
	let tempGoal = $state(0)
	let isEditing = $state(false)

	const startEditing = (): void => {
		tempGoal = waterGoal
		isEditing = true
	}

	const saveGoal = (): void => {
		if (Number.isNaN(tempGoal) || tempGoal <= 0) return

		waterGoal = tempGoal
		isEditing = false
	}

	const handleKeydown = (e: KeyboardEvent): void => {
		if (e.key === 'Enter') {
			saveGoal()
		} else if (e.key === 'Escape') {
			isEditing = false
		}
	}
</script>

{#if isEditing}
	<div class="flex gap-2">
		<label for="water-goal">New goal (in mL):</label>
		<input
			type="number"
			min="0"
			step="100"
			id="water-goal"
			bind:value={tempGoal}
			onkeydown={handleKeydown}
		/>
	</div>
{:else}
	<button onclick={startEditing}>
		<WaterDisplay {unit} water={waterGoal} />
	</button>
{/if}
