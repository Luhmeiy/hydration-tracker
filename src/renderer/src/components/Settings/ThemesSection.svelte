<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import { onMount } from 'svelte'
	import type { Mode } from '$interfaces/Mode'
	import ToggleSwitch from './ToggleSwitch.svelte'
	import { DEFAULT_MODES } from '$utils/defaultModes'

	const conf = new Conf()

	let selectedModes = $state<Mode[]>(DEFAULT_MODES)
	let coreModes = $state<Mode[]>(DEFAULT_MODES.slice(0, 3))
	let extraModes = $state<Mode[]>(DEFAULT_MODES.slice(3))

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

	onMount(async () => {
		selectedModes = JSON.parse((await conf.get('selectedModes')) as string) || DEFAULT_MODES
	})
</script>

<section class="flex flex-col items-center gap-2">
	<h2 class="font-bold">Themes</h2>

	<div class="flex flex-col gap-3 text-sm">
		<div class="flex flex-col gap-1">
			<h3 class="font-bold text-center">Core</h3>
			{#each coreModes as mode (mode)}
				<ToggleSwitch
					action={() => updateSelectedModes(mode)}
					disabled={selectedModes.includes(mode) && selectedModes.length === 1}
					label={mode}
					value={selectedModes.includes(mode)}
				/>
			{/each}
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="font-bold text-center">Extra</h3>
			{#each extraModes as mode (mode)}
				<ToggleSwitch
					action={() => updateSelectedModes(mode)}
					disabled={selectedModes.includes(mode) && selectedModes.length === 1}
					label={mode}
					value={selectedModes.includes(mode)}
				/>
			{/each}
		</div>
	</div>
</section>
