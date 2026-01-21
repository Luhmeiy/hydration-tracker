<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Unit } from '../interfaces/Unit'
	import WaterDisplay from './WaterDisplay.svelte'

	const conf = new Conf()

	let {
		waterGoal = $bindable(),
		isGoalAchieved = $bindable(),
		errorMessage = $bindable(),
		unit,
		waterTotal
	}: {
		waterGoal: number
		isGoalAchieved: boolean
		errorMessage: string
		unit: Unit
		waterTotal: number
	} = $props()

	let tempGoal = $state(0)
	let isEditing = $state(false)

	let inputRef: HTMLInputElement = $state()

	const startEditing = (): void => {
		tempGoal = waterGoal
		isEditing = true
	}

	const saveGoal = async (): Promise<void> => {
		if (Number.isNaN(tempGoal) || tempGoal <= 0) {
			errorMessage = 'Enter a valid number.'
			return
		}

		waterGoal = tempGoal
		isGoalAchieved = waterTotal >= waterGoal
		isEditing = false

		await conf.set('waterGoal', waterGoal)
		await conf.set('isGoalAchieved', isGoalAchieved)
	}

	const handleKeydown = (e: KeyboardEvent): void => {
		if (e.key === 'Enter') {
			saveGoal()
		} else if (e.key === 'Escape') {
			isEditing = false
		}
	}

	$effect(() => {
		if (isEditing && inputRef) {
			inputRef.focus()
		}
	})
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
			bind:this={inputRef}
			bind:value={tempGoal}
			onblur={() => (isEditing = false)}
			onkeydown={handleKeydown}
		/>
	</div>
{:else}
	<button class="cursor-pointer" onclick={startEditing}>
		<WaterDisplay {unit} water={waterGoal} />
	</button>
{/if}
