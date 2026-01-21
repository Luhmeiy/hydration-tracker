<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import Button from './components/Button.svelte'
	import ErrorModal from './components/ErrorModal.svelte'
	import Header from './components/Header.svelte'
	import Modal from './components/Modal.svelte'
	import PresetForm from './components/PresetForm.svelte'
	import ToggleMode from './components/ToggleMode.svelte'
	import UnitSelect from './components/UnitSelect.svelte'
	import WaterDisplay from './components/WaterDisplay.svelte'
	import WaterGoalDisplay from './components/WaterGoalDisplay.svelte'
	import type { Preset } from './interfaces/Preset'
	import type { Unit } from './interfaces/Unit'

	const conf = new Conf()

	let unit: Unit = $state('L')
	let date = $state(new Date())
	let presets: Preset[] = $state([])

	let waterGoal = $state(2500)
	let waterTotal = $state(0)
	let waterToAdd = $state(0)

	let isGoalAchieved = $state(false)
	let isGoalModalOpen = $state(false)
	let goalSymbol = $derived(isGoalAchieved ? '🎉' : '')

	let errorMessage = $state('')

	const addWater = async (value: number): Promise<void> => {
		if (Number.isNaN(value) || value <= 0) {
			errorMessage = 'Enter a valid number.'
			return
		}

		waterTotal += value

		if (!isGoalAchieved && waterTotal >= waterGoal) {
			isGoalAchieved = true
			isGoalModalOpen = true

			await conf.set('isGoalAchieved', isGoalAchieved)
		}

		await conf.set('waterTotal', waterTotal)
	}

	$effect(() => {
		const getData = async (): Promise<void> => {
			unit = ((await conf.get('unit')) as Unit) || 'L'
			date = new Date((await conf.get('date')) as string)
			presets = JSON.parse((await conf.get('presets')) as string) || []
			waterGoal = ((await conf.get('waterGoal')) as number) || 2500

			const today = new Date()

			if (date.toDateString() === today.toDateString()) {
				waterTotal = ((await conf.get('waterTotal')) as number) || 0
				isGoalAchieved = ((await conf.get('isGoalAchieved')) as boolean) || false
			} else {
				await conf.set('date', today)
				await conf.set('waterTotal', 0)
				await conf.set('isGoalAchieved', false)
			}
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
		{#if errorMessage}
			<ErrorModal bind:errorMessage />
		{/if}

		{#if isGoalAchieved && isGoalModalOpen}
			<Modal close={() => (isGoalModalOpen = false)}>
				<h1 class="font-bold">Congratulations!</h1>
				<p class="text-center leading-5">You achieved your daily goal!</p>
			</Modal>
		{/if}

		<ToggleMode />

		<div class="text-center">
			<h2 class="font-bold">My goal</h2>
			<span class="flex items-center">
				{goalSymbol}
				<WaterDisplay {unit} water={waterTotal} /> /&nbsp;
				<WaterGoalDisplay
					bind:waterGoal
					bind:isGoalAchieved
					bind:errorMessage
					{unit}
					{waterTotal}
				/>&nbsp
				{goalSymbol}
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

					<PresetForm bind:presets bind:errorMessage {waterToAdd} />
				</div>
			</div>
		</div>

		<UnitSelect bind:unit />
	</div>
</div>
