<script lang="ts">
	import type { Preset } from '$interfaces/Preset'
	import type { Unit } from '$interfaces/Unit'
	import AddPreset from './AddPreset.svelte'
	import Button from './Button.svelte'

	interface PresetSectionProps {
		addWater: (value: number, isPreset?: boolean) => Promise<void>
		errorMessage: string | null
		presets: Preset[]
		unit: Unit
	}

	let {
		errorMessage = $bindable(),
		presets = $bindable(),
		addWater,
		unit
	}: PresetSectionProps = $props()

	let waterToAdd = $state(0)
</script>

<div class="text-center">
	<h2 class="font-bold">Add water</h2>

	<div class="flex flex-col gap-1 items-center">
		<div class="flex gap-2 items-center">
			<label for="water-add">(in {unit}):</label>
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
			<AddPreset bind:presets bind:errorMessage {waterToAdd} {unit} />
		</div>
	</div>
</div>
