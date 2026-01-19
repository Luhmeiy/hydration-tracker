<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import Button from './components/Button.svelte'
	import Header from './components/Header.svelte'
	import PresetForm from './components/PresetForm.svelte'
	import ToggleMode from './components/ToggleMode.svelte'
	import UnitSelect from './components/UnitSelect.svelte'
	import WaterDisplay from './components/WaterDisplay.svelte'
	import WaterGoalDisplay from './components/WaterGoalDisplay.svelte'
	import type { Preset } from './interfaces/Preset'
	import type { Unit } from './interfaces/Unit'

	const conf = new Conf()

	let unit: Unit = $state('L')
	let presets: Preset[] = $state([])

	let waterGoal = $state(2500)
	let waterTotal = $state(0)
	let waterToAdd = $state(0)

	const addWater = async (value: number): Promise<void> => {
		if (Number.isNaN(value) || value <= 0) return

		waterTotal += value

		await conf.set('waterTotal', waterTotal)
	}

	$effect(() => {
		const getData = async (): Promise<void> => {
			unit = ((await conf.get('unit')) as Unit) || 'L'
			presets = JSON.parse((await conf.get('presets')) as string) || []
			waterTotal = ((await conf.get('waterTotal')) as number) || 0
			waterGoal = ((await conf.get('waterGoal')) as number) || 2500
		}

		getData()
	})
</script>

<div
	class="bg-lightblue flex flex-col gap-1 p-2 font-silkscreen border-3 border-darkblue rounded-lg text-darkblue overflow-x-hidden transition-colors duration-500 **:transition-colors **:duration-500 grey:bg-red-500"
>
	<Header />

	<div
		class="relative bg-white flex flex-col items-center justify-center gap-4 py-6 border-3 border-darkblue rounded-b-lg dark:bg-zinc-800 darker:bg-zinc-950"
	>
		<ToggleMode />

		<div class="text-center">
			<h2 class="font-bold">My goal</h2>
			<span class="flex items-center">
				<WaterDisplay {unit} water={waterTotal} /> /&nbsp;<WaterGoalDisplay
					bind:waterGoal
					{unit}
				/>
			</span>
		</div>

		<div class="flex flex-col items-center">
			<h2 class="font-bold">Presets</h2>
			<div class="flex justify-center flex-wrap gap-2">
				{#if presets.length > 0}
					{#each presets as preset (preset.name)}
						<Button action={() => addWater(preset.value)} text={preset.name} />
					{/each}
				{:else}
					<p>No presets found.</p>
				{/if}
			</div>
		</div>

		<div class="text-center">
			<h2 class="font-bold">Add water</h2>

			<div class="flex flex-col gap-1 items-center">
				<div class="flex gap-2 items-center">
					<label for="water-add">(in mL):</label>
					<input
						type="number"
						min="0"
						step="100"
						id="water-add"
						class="w-20 border-3 rounded-[2px] px-1"
						bind:value={waterToAdd}
						onkeydown={(e) => e.code === 'Enter' && addWater(waterToAdd)}
					/>
				</div>

				<div class="flex gap-2">
					<Button action={() => addWater(waterToAdd)} text="Drink" />

					<PresetForm bind:presets {waterToAdd} />
				</div>
			</div>
		</div>

		<UnitSelect bind:unit />
	</div>
</div>
