<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Mode } from '$interfaces/Mode'
	import ErrorModal from '$components/ErrorModal.svelte'
	import Header from '$components/Header.svelte'

	const conf = new Conf()

	let errorMessage = $state('')

	$effect(() => {
		const getTheme = async (): Promise<void> => {
			const mode = ((await conf.get('mode')) as Mode) || 'light'

			if (mode) {
				document.documentElement.classList.add(mode)
			}
		}

		getTheme()
	})
</script>

<div
	class="bg-lightblue max-h-dvh flex flex-col gap-1 p-2 font-silkscreen border-3 border-darkblue rounded-lg text-darkblue overflow-x-hidden transition-colors duration-500 **:transition-colors **:duration-500"
>
	<Header closeAppToTray={false} headerTitle="Calendar" isCalendar />

	<div
		class="relative h-full bg-white flex flex-col items-center gap-4 px-2 py-6 border-3 border-darkblue rounded-b-lg overflow-y-auto dark:bg-zinc-800 darker:bg-zinc-950"
	>
		<ErrorModal bind:errorMessage />
	</div>
</div>
