<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Preset } from '../interfaces/Preset'
	import type { Unit } from '../interfaces/Unit'
	import AddWaterSection from '../components/AddWaterSection.svelte'
	import ErrorModal from '../components/ErrorModal.svelte'
	import GoalDisplay from '../components/GoalDisplay.svelte'
	import PresetSection from '../components/PresetSection.svelte'
	import ToggleMode from '../components/ToggleMode.svelte'
	import UnitSelect from '../components/UnitSelect.svelte'
	import { validateNumber } from '../utils/validateNumber'

	const conf = new Conf()

	let unit = $state<Unit>('L')
	let presets = $state<Preset[]>([])
	let waterGoal = $state(2500)
	let waterTotal = $state(0)

	let errorMessage = $state('')

	const addWater = async (value: number): Promise<void> => {
		errorMessage = validateNumber(value)
		if (errorMessage) return

		waterTotal += value

		await conf.set('waterTotal', waterTotal)
	}

	$effect(() => {
		const getData = async (): Promise<void> => {
			unit = ((await conf.get('unit')) as Unit) || 'L'
			presets = JSON.parse((await conf.get('presets')) as string) || []
			waterGoal = ((await conf.get('waterGoal')) as number) || 2500

			const date = new Date((await conf.get('date')) as string)
			const today = new Date()
			const isToday = date.toDateString() === today.toDateString()

			if (isToday) {
				waterTotal = ((await conf.get('waterTotal')) as number) || 0
			} else {
				await conf.set('date', today)
				await conf.set('waterTotal', 0)
			}
		}

		getData()
	})
</script>

<ErrorModal bind:errorMessage />

<ToggleMode />

<GoalDisplay bind:errorMessage bind:waterGoal bind:waterTotal {unit} />

<PresetSection bind:errorMessage bind:presets {addWater} />

<AddWaterSection bind:errorMessage bind:presets {addWater} />

<UnitSelect bind:unit />
