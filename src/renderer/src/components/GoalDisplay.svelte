<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Unit } from '../interfaces/Unit'
	import GoalSymbol from './GoalSymbol.svelte'
	import InputSwitch from './InputSwitch.svelte'
	import WaterDisplay from './WaterDisplay.svelte'

	const conf = new Conf()

	interface GoalDisplayProps {
		errorMessage: string | null
		isGoalAchieved: boolean
		waterGoal: number
		waterTotal: number
		unit: Unit
	}

	let {
		errorMessage = $bindable(),
		isGoalAchieved = $bindable(),
		waterGoal = $bindable(),
		waterTotal = $bindable(),
		unit
	}: GoalDisplayProps = $props()

	const validateNumber = (value: number): string | null => {
		if (Number.isNaN(value) || value <= 0) {
			return 'Enter a valid number.'
		}

		return null
	}

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

		isGoalAchieved = waterTotal >= waterGoal
		await conf.set('isGoalAchieved', isGoalAchieved)
		return false
	}
</script>

<div class="text-center">
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
</div>
