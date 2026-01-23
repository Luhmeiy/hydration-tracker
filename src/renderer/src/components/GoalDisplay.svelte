<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Unit } from '../interfaces/Unit'
	import GoalSymbol from './GoalSymbol.svelte'
	import InputSwitch from './InputSwitch.svelte'
	import Modal from './Modal.svelte'
	import WaterDisplay from './WaterDisplay.svelte'
	import { validateNumber } from '../utils/validateNumber'

	const conf = new Conf()

	interface GoalDisplayProps {
		errorMessage: string | null
		unit: Unit
		waterGoal: number
		waterTotal: number
	}

	let {
		errorMessage = $bindable(),
		waterGoal = $bindable(),
		waterTotal = $bindable(),
		unit
	}: GoalDisplayProps = $props()

	let isGoalAchieved = $derived(waterTotal >= waterGoal)
	let isGoalModalOpen = $derived(isGoalAchieved)

	const saveWater = async (type: 'total' | 'goal', value: number): Promise<boolean> => {
		errorMessage = validateNumber(value)
		if (errorMessage) return true

		switch (type) {
			case 'total':
				waterTotal = value
				await conf.set('waterTotal', waterTotal)
				break
			case 'goal':
				waterGoal = value
				await conf.set('waterGoal', waterGoal)
				break
		}

		return false
	}
</script>

{#if isGoalAchieved && isGoalModalOpen}
	<Modal close={() => (isGoalModalOpen = false)}>
		<h1 class="font-bold">Congratulations!</h1>
		<p class="text-center leading-5">You achieved your daily goal!</p>
	</Modal>
{/if}

<section class="text-center">
	<h2 class="font-bold">My goal</h2>
	<span class="flex items-center">
		<GoalSymbol {isGoalAchieved} />
		&nbsp
		<InputSwitch value={waterTotal} action={(value: number) => saveWater('total', value)}>
			<WaterDisplay {unit} water={waterTotal} />
		</InputSwitch>
		&nbsp/&nbsp
		<InputSwitch value={waterGoal} action={(value: number) => saveWater('goal', value)}>
			<WaterDisplay {unit} water={waterGoal} />
		</InputSwitch>
		&nbsp
		<GoalSymbol {isGoalAchieved} />
	</span>
</section>
