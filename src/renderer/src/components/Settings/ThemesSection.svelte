<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Mode } from '$interfaces/Mode'
	import ToggleSwitch from './ToggleSwitch.svelte'
	import { DEFAULT_MODES } from '$utils/defaultModes'

	const conf = new Conf()

	let selectedModes = $state<Mode[]>(DEFAULT_MODES)

	const updateSelectedModes = async (key: Mode): Promise<void> => {
		if (selectedModes.includes(key)) {
			selectedModes = selectedModes.filter((mode) => mode !== key)

			if (selectedModes.length === 1) {
				document.documentElement.className = ''
				document.documentElement.classList.add(selectedModes[0])
				await conf.set('mode', selectedModes[0])
			}
		} else {
			selectedModes = [...selectedModes, key]
		}

		await conf.set('selectedModes', JSON.stringify(selectedModes))
	}

	$effect(() => {
		const getSelectedTheme = async (): Promise<void> => {
			selectedModes = JSON.parse((await conf.get('selectedModes')) as string) || DEFAULT_MODES
		}

		getSelectedTheme()
	})
</script>

<section class="flex flex-col items-center gap-2">
	<h2 class="font-bold">Themes</h2>

	<div class="flex flex-col gap-1 text-sm">
		{#each DEFAULT_MODES as mode (mode)}
			<ToggleSwitch
				action={() => updateSelectedModes(mode)}
				disabled={selectedModes.includes(mode) && selectedModes.length === 1}
				label={mode}
				value={selectedModes.includes(mode)}
			/>
		{/each}
	</div>
</section>
