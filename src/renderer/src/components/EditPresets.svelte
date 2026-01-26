<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Preset } from '../interfaces/Preset'
	import InputSwitch from './InputSwitch.svelte'
	import Modal from './Modal.svelte'
	import { validatePreset } from '../utils/validatePreset'

	const conf = new Conf()

	interface EditPresetsProps {
		errorMessage: string | null
		isEditPreset: boolean
		presets: Preset[]
	}

	let {
		errorMessage = $bindable(),
		isEditPreset = $bindable(),
		presets = $bindable()
	}: EditPresetsProps = $props()

	const editPreset = async (
		key: 'name' | 'value',
		name: string,
		value: string | number
	): Promise<boolean> => {
		errorMessage = validatePreset(presets, value)
		if (errorMessage) return true

		presets = presets.map((preset) => {
			if (preset.name === name) {
				return { ...preset, [key]: value }
			}

			return preset
		})

		await conf.set('presets', JSON.stringify(presets))
		return false
	}

	const deletePreset = async (name: string): Promise<void> => {
		presets = presets.filter((preset) => preset.name !== name)
		await conf.set('presets', JSON.stringify(presets))

		if (presets.length === 0) {
			isEditPreset = false
		}
	}
</script>

{#if presets.length > 0 && isEditPreset}
	<Modal close={() => (isEditPreset = false)}>
		<h1 class="font-bold">Presets</h1>
		<div class="w-full grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-0.5">
			{#each presets as preset (preset.name)}
				<InputSwitch
					action={(value: string | number) => editPreset('name', preset.name, value)}
					value={preset.name}
					isText
					isPreset
				>
					{preset.name}
				</InputSwitch>

				<InputSwitch
					action={(value: string | number) => editPreset('value', preset.name, value)}
					value={preset.value}
					isPreset
				>
					{preset.value || 'Empty'}
				</InputSwitch>

				<button
					class="flex items-center cursor-pointer transition-transform! duration-200! hover:rotate-20 hover:scale-110"
					onclick={() => deletePreset(preset.name)}
					title="delete preset"
				>
					🗑️
				</button>
			{/each}
		</div>
	</Modal>
{/if}
