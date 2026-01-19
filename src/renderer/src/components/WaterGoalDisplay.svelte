<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Unit } from '../interfaces/Unit'
	import WaterDisplay from './WaterDisplay.svelte'

	const conf = new Conf()

	let { waterGoal = $bindable(), unit }: { waterGoal: number; unit: Unit } = $props()
	let tempGoal = $state(0)
	let isEditing = $state(false)

	const startEditing = (): void => {
		tempGoal = waterGoal
		isEditing = true
	}

	const saveGoal = async (): Promise<void> => {
		if (Number.isNaN(tempGoal) || tempGoal <= 0) return

		waterGoal = tempGoal
		isEditing = false

		await conf.set('waterGoal', waterGoal)
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
	<div class="flex gap-2 items-center">
		<label for="water-goal">(in mL):</label>
		<input
			type="number"
			min="0"
			step="100"
			id="water-goal"
			class="w-20 border-3 rounded-[2px] px-1"
			bind:value={tempGoal}
			onkeydown={handleKeydown}
		/>
	</div>
{:else}
	<button onclick={startEditing}>
		<WaterDisplay {unit} water={waterGoal} />
	</button>
{/if}
