<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Calendar } from '$interfaces/Calendar'
	import type { Mode } from '$interfaces/Mode'
	import CalendarBlock from '$components/Calendar/CalendarBlock.svelte'
	import Header from '$components/Header.svelte'

	const conf = new Conf()
	const today = new Date()

	const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
	const totalCells = 35

	let calendar = $state<Calendar>()

	let year = $state(today.toLocaleString('en', { year: 'numeric' }))
	let month = $state(today.toLocaleString('en', { month: '2-digit' }))
	let fullMonth = $state(today.toLocaleString('en', { month: 'long' }))

	let firstMonthDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
	let lastMonthDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
	let trailingEmpty = totalCells - lastMonthDay - firstMonthDay

	$effect(() => {
		const getData = async (): Promise<void> => {
			const mode = ((await conf.get('mode')) as Mode) || 'light'
			calendar = JSON.parse((await conf.get('calendar')) as string) || null

			if (mode) {
				document.documentElement.classList.add(mode)
			}
		}

		getData()
	})
</script>

<div
	class="bg-lightblue max-h-dvh flex flex-col gap-1 p-2 font-silkscreen border-3 border-darkblue rounded-lg text-darkblue overflow-x-hidden transition-colors duration-500 **:transition-colors **:duration-500"
>
	<Header closeAppToTray={false} headerTitle="Calendar" isCalendar />

	<div
		class="relative h-full bg-white flex flex-col items-center gap-1 px-9 py-6 border-3 border-darkblue rounded-b-lg overflow-y-auto dark:bg-zinc-800 darker:bg-zinc-950"
	>
		<h2 class="font-bold">{fullMonth}</h2>

		{#if calendar}
			<div class="w-full grid grid-cols-7 gap-1">
				{#each weekdays as weekday, i (i)}
					<p class="text-center">{weekday}</p>
				{/each}

				{#each { length: firstMonthDay }}
					<CalendarBlock isDisabled />
				{/each}

				{#each { length: lastMonthDay }, index}
					<CalendarBlock day={calendar[`${year}-${month}-${index + 1}`] || null} />
				{/each}

				{#each { length: trailingEmpty }}
					<CalendarBlock isDisabled />
				{/each}
			</div>
		{/if}
	</div>
</div>
