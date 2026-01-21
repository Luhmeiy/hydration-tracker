<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Preset } from '../interfaces/Preset'
	import Button from './Button.svelte'
	import Modal from './Modal.svelte'

	const conf = new Conf()

	let {
		presets = $bindable(),
		errorMessage = $bindable(),
		waterToAdd
	}: {
		presets: Preset[]
		errorMessage: string
		waterToAdd: number
	} = $props()

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

	const validatePreset = (): string | null => {
		if (Number.isNaN(waterToAdd) || waterToAdd <= 0) {
			return 'Enter a valid number.'
		}

		if (!presetName.trim()) {
			return 'Preset name is required.'
		}

		if (presets.some((preset) => preset.value === waterToAdd)) {
			return 'Preset value already in use.'
		}

		if (presets.some((preset) => preset.name === presetName)) {
			return 'Preset name already in use.'
		}

		return null
	}

	const addPreset = async (): Promise<void> => {
		errorMessage = validatePreset()

		if (errorMessage) {
			cleanPreset()
			return
		}

		presets = [...presets, { name: presetName.trim(), value: waterToAdd }]

		await conf.set('presets', JSON.stringify(presets))

		cleanPreset()
	}

	const handleKeydown = (e: KeyboardEvent): void => {
		if (e.key === 'Enter') {
			addPreset()
		} else if (e.key === 'Escape') {
			isAddingPreset = false
		}
	}
</script>

<div class="flex flex-col">
	<Button action={startAdding} text="Create preset" />
</div>

{#if isAddingPreset}
	<Modal close={cleanPreset}>
		<div class="flex flex-col gap-2">
			<label for="preset-add">Preset name:</label>
			<input
				type="text"
				id="preset-add"
				class="w-auto border-3 rounded-[2px] px-1"
				bind:value={presetName}
				onkeydown={handleKeydown}
			/>
		</div>

		<Button action={addPreset} text="Add preset" />
	</Modal>
{/if}
