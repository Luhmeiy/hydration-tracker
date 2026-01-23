<script lang="ts">
	import { Conf } from 'electron-conf/renderer'

	type Mode = 'light' | 'dark' | 'darker'

	const conf = new Conf()

	const modeSymbols = new Map<Mode, string>([
		['light', '☀️'],
		['dark', '🌗'],
		['darker', '🌕']
	])

	let mode = $state<Mode>('light')
	let symbol = $derived(modeSymbols.get(mode) || '☀️')

	const getNextMode = (currentMode: Mode): Mode => {
		const keys = Array.from(modeSymbols.keys())
		const currentIndex = keys.indexOf(currentMode)
		const nextIndex = (currentIndex + 1) % keys.length

		return keys[nextIndex]
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

			if (mode) {
				document.documentElement.classList.add(mode)
			}
		}

		getTheme()
	})
</script>

<button
	onclick={toggle}
	class="absolute top-2 right-2 w-9 h-9 bg-lightblue border-3 border-darkblue rounded cursor-pointer hover:bg-lightblue-hover active:bg-lightblue-active"
>
	{symbol}
</button>
