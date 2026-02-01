<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Preset } from '$interfaces/Preset'
	import Button from './Button.svelte'
	import Modal from '../Modal.svelte'
	import { handleKeydown } from '$utils/handleKeydown'
	import { validatePreset } from '$utils/validatePreset'

	const conf = new Conf()

	interface PresetFormProps {
		errorMessage: string | null
		presets: Preset[]
		waterToAdd: number
	}

	let {
		errorMessage = $bindable(),
		presets = $bindable(),
		waterToAdd
	}: PresetFormProps = $props()

	let presetName = $state('')
	let isAddingPreset = $state(false)

	const startAdding = (): void => {
		isAddingPreset = true
		errorMessage = ''
	}

	const cleanPreset = (): void => {
		presetName = ''
		isAddingPreset = false
	}

	const addPreset = async (): Promise<void> => {
		let nameError = validatePreset(presets, presetName)
		let valueError = validatePreset(presets, waterToAdd)

		errorMessage = nameError || valueError

		if (errorMessage) {
			cleanPreset()
			return
		}

		presets = [...presets, { name: presetName.trim(), value: waterToAdd }]

		await conf.set('presets', JSON.stringify(presets))

		cleanPreset()
	}
</script>

<Button action={startAdding} text="Create preset" />

{#if isAddingPreset}
	<Modal close={cleanPreset}>
		<div class="w-full flex flex-col gap-2">
			<label for="preset-add">Preset name:</label>
			<input
				type="text"
				id="preset-add"
				class="max-w-64 border-3 rounded-[2px] px-1"
				bind:value={presetName}
				onkeydown={(e) => handleKeydown(e, addPreset, () => (isAddingPreset = false))}
			/>
		</div>

		<Button action={addPreset} text="Add preset" />
	</Modal>
{/if}
