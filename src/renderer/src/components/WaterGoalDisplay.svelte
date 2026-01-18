<script lang="ts">
	import { convertToLiters } from '../utils/convertToLiters'

	let goal = $state(2.5)
	let tempGoal = $state(2500)
	let isEditing = $state(false)

	const startEditing = (): void => {
		tempGoal = goal * 1000
		isEditing = true
	}

	const saveGoal = (): void => {
		if (!Number.isNaN(tempGoal) && tempGoal >= 0) {
			goal = convertToLiters(tempGoal)
		}

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
		{goal}L
	</button>
{/if}
