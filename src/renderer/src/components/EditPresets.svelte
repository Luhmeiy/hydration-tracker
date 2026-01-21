<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Preset } from '../interfaces/Preset'
	import Modal from './Modal.svelte'

	const conf = new Conf()

	let {
		isEditPreset = $bindable(),
		presets = $bindable()
	}: {
		isEditPreset: boolean
		presets: Preset[]
	} = $props()

	const deletePreset = async (name: string): Promise<void> => {
		presets = presets.filter((preset) => preset.name !== name)
		await conf.set('presets', JSON.stringify(presets))
	}
</script>

{#if isEditPreset}
	<Modal close={() => (isEditPreset = false)}>
		<h1 class="font-bold">Presets</h1>
		<div class="w-full grid grid-cols-[1fr_auto_auto] gap-x-2">
			{#each presets as preset (preset.name)}
				<p class="wrap-anywhere">{preset.name}</p>
				<p>{preset.value}</p>
				<button class="flex cursor-pointer" onclick={() => deletePreset(preset.name)}>
					🗑️
				</button>
			{/each}
		</div>
	</Modal>
{/if}
