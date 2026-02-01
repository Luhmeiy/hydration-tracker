<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Mode } from '$interfaces/Mode'
	import { DEFAULT_MODES, DEFAULT_MODE_SYMBOLS } from '$utils/defaultModes'

	const conf = new Conf()

	let mode = $state<Mode>('light')
	let selectedModes = $state<Mode[]>(DEFAULT_MODES)
	let symbol = $derived(DEFAULT_MODE_SYMBOLS.get(mode) || '☀️')

	const getNextMode = (currentMode: Mode): Mode => {
		const currentIndex = selectedModes.indexOf(currentMode)
		const nextIndex = (currentIndex + 1) % selectedModes.length

		return selectedModes[nextIndex]
	}

	const toggle = async (): Promise<void> => {
		document.documentElement.className = ''

		mode = getNextMode(mode)

		document.documentElement.classList.add(mode)

		await conf.set('mode', mode)
	}

	$effect(() => {
		const getTheme = async (): Promise<void> => {
			mode = ((await conf.get('mode')) as Mode) || 'light'
			selectedModes = JSON.parse((await conf.get('selectedModes')) as string) || DEFAULT_MODES

			if (mode) {
				document.documentElement.classList.add(mode)
			}
		}

		getTheme()
	})
</script>

{#if selectedModes.length > 1}
	<button
		onclick={toggle}
		class="absolute top-2 right-2 w-9 h-9 bg-lightblue border-3 border-darkblue rounded cursor-pointer hover:bg-lightblue-hover active:bg-lightblue-active"
		title="change theme"
	>
		{symbol}
	</button>
{/if}
