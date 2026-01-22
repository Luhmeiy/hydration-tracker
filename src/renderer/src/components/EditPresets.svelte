<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Preset } from '../interfaces/Preset'
	import EditPresetInput from './EditPresetInput.svelte'
	import Modal from './Modal.svelte'

	const conf = new Conf()

	let {
		isEditPreset = $bindable(),
		presets = $bindable(),
		errorMessage = $bindable()
	}: {
		isEditPreset: boolean
		presets: Preset[]
		errorMessage: string
	} = $props()

	const deletePreset = async (name: string): Promise<void> => {
		presets = presets.filter((preset) => preset.name !== name)
		await conf.set('presets', JSON.stringify(presets))
	}
</script>

{#if presets.length > 0 && isEditPreset}
	<Modal close={() => (isEditPreset = false)}>
		<h1 class="font-bold">Presets</h1>
		<div class="w-full grid grid-cols-[1fr_auto_auto] gap-x-3">
			{#each presets as preset (preset.name)}
				<EditPresetInput
					bind:presets
					bind:errorMessage
					name={preset.name}
					key="name"
					value={preset.name}
				/>

				<EditPresetInput
					bind:presets
					bind:errorMessage
					name={preset.name}
					key="value"
					value={preset.value}
				/>

				<button
					class="flex items-center cursor-pointer duration-200! hover:rotate-20 hover:scale-110"
					onclick={() => deletePreset(preset.name)}
				>
					🗑️
				</button>
			{/each}
		</div>
	</Modal>
{/if}
