<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Mode } from '$interfaces/Mode'
	import CalendarBlock from '$components/Calendar/CalendarBlock.svelte'
	import Header from '$components/Header.svelte'

	const conf = new Conf()
	const today = new Date()

	const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
	const totalCells = 35

	let month = $state(today.toLocaleString('en', { month: 'long' }))

	let firstMonthDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
	let lastMonthDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
	let trailingEmpty = totalCells - lastMonthDay - firstMonthDay

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
		class="relative h-full bg-white flex flex-col items-center gap-1 px-9 py-6 border-3 border-darkblue rounded-b-lg overflow-y-auto dark:bg-zinc-800 darker:bg-zinc-950"
	>
		<h2 class="font-bold">{month}</h2>

		<div class="w-full grid grid-cols-7 gap-1">
			{#each weekdays as weekday, i (i)}
				<p class="text-center">{weekday}</p>
			{/each}

			{#each { length: firstMonthDay }}
				<CalendarBlock isDisabled />
			{/each}

			{#each { length: lastMonthDay }}
				<CalendarBlock />
			{/each}

			{#each { length: trailingEmpty }}
				<CalendarBlock isDisabled />
			{/each}
		</div>
	</div>
</div>
