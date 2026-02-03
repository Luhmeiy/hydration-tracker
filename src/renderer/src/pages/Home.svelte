<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Preset } from '$interfaces/Preset'
	import type { Unit } from '$interfaces/Unit'
	import AddWaterSection from '$components/Home/AddWaterSection.svelte'
	import GoalDisplay from '$components/Home/GoalDisplay.svelte'
	import PresetSection from '$components/Home/PresetSection.svelte'
	import ToggleMode from '$components/Home/ToggleMode.svelte'
	import UnitSelect from '$components/Home/UnitSelect.svelte'
	import { convertValueToMl } from '$utils/convertUnit'
	import { validateNumber } from '$utils/validateNumber'

	const conf = new Conf()

	let { errorMessage = $bindable() }: { errorMessage: string } = $props()

	let unit = $state<Unit>('L')
	let presets = $state<Preset[]>([])
	let waterGoal = $state(2500)
	let waterTotal = $state(0)

	const addWater = async (value: number, isPreset?: boolean): Promise<void> => {
		errorMessage = validateNumber(value)
		if (errorMessage) return

		waterTotal += isPreset ? value : convertValueToMl(value, unit)

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

<ToggleMode />

<GoalDisplay bind:errorMessage bind:waterGoal bind:waterTotal {unit} />

<PresetSection bind:errorMessage bind:presets {addWater} {unit} />

<AddWaterSection bind:errorMessage bind:presets {addWater} {unit} />

<UnitSelect bind:unit />
