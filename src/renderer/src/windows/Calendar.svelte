<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import { onDestroy, onMount } from 'svelte'
	import type { Calendar, CalendarEntry } from '$interfaces/Calendar'
	import type { Mode } from '$interfaces/Mode'
	import type { NewDate } from '$interfaces/NewDate'
	import type { Unit } from '$interfaces/Unit'
	import CalendarBlock from '$components/Calendar/CalendarBlock.svelte'
	import Header from '$components/Header.svelte'
	import MonthSwitch from '$components/Calendar/MonthSwitch.svelte'

	const conf = new Conf()
	const today = new Date()

	interface CalendarDays {
		date: string
		entry: CalendarEntry | null
	}

	const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

	let calendar = $state<Calendar>()
	let mode = $state<Mode>()
	let unit = $state<Unit>()

	let year = $state(+today.getFullYear())
	let month = $state(+today.getMonth() + 1)

	let firstMonthDay = $derived(new Date(year, month - 1, 1).getDay())
	let lastMonthDay = $derived(new Date(year, month, 0).getDate())

	let totalCells = $derived(firstMonthDay + lastMonthDay > 35 ? 42 : 35)
	let trailingEmpty = $derived(totalCells - lastMonthDay - firstMonthDay)

	let calendarDays = $derived<CalendarDays[]>(
		Array.from({ length: lastMonthDay }, (_, index) => createDay(year, month, index + 1))
	)

	let previousMonthDays = $derived<() => CalendarDays[]>(() => {
		const { newYear, newMonth } = getPreviousDate()

		return Array.from({ length: firstMonthDay }, (_, index) => {
			const day = new Date(year, month - 1, 0).getDate() - index
			return createDay(newYear, newMonth, day)
		}).reverse()
	})

	let nextMonthDays = $derived<() => CalendarDays[]>(() => {
		const { newYear, newMonth } = getNextDate()

		return Array.from({ length: trailingEmpty }, (_, index) => {
			return createDay(newYear, newMonth, index + 1)
		})
	})

	const getPreviousDate = (): NewDate => {
		const newYear = month - 1 === 0 ? year - 1 : year
		const newMonth = month - 1 === 0 ? 12 : month - 1

		return { newYear, newMonth }
	}

	const getNextDate = (): NewDate => {
		const newYear = month + 1 === 13 ? year + 1 : year
		const newMonth = month + 1 === 13 ? 1 : month + 1

		return { newYear, newMonth }
	}

	const createDay = (year: number, month: number, day: number): CalendarDays => {
		const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

		return {
			date,
			entry: calendar[date] || null
		}
	}

	onMount(async () => {
		mode = ((await conf.get('mode')) as Mode) || 'light'
		calendar = JSON.parse((await conf.get('calendar')) as string) || null
		unit = ((await conf.get('unit')) as Unit) || 'L'

		const unsubscribe = window.api.onConfigChange(async () => {
			mode = (await conf.get('mode')) as Mode
			calendar = JSON.parse((await conf.get('calendar')) as string)
			unit = (await conf.get('unit')) as Unit
		})

		onDestroy(unsubscribe)
	})

	$effect(() => {
		document.documentElement.className = ''
		document.documentElement.classList.add(mode)
	})
</script>

<div
	class="bg-background max-h-dvh flex flex-col gap-1 p-2 font-silkscreen border-3 border-foreground rounded-lg text-foreground overflow-x-hidden transition-colors duration-500 **:transition-colors **:duration-500"
>
	<Header closeAppToTray={false} headerTitle="Calendar" isCalendar />

	<div
		class="relative h-full bg-white flex flex-col items-center gap-1 px-9 py-6 border-3 border-foreground rounded-b-lg overflow-y-auto dark:bg-zinc-800 darker:bg-zinc-950"
	>
		<MonthSwitch bind:month bind:year {getPreviousDate} {getNextDate} />

		{#if calendar}
			<div class="w-full grid grid-cols-7 gap-1">
				{#each weekdays as weekday, i (i)}
					<p class="text-center">{weekday}</p>
				{/each}

				{#each previousMonthDays() as { date, entry } (date)}
					<CalendarBlock isDisabled {entry} {date} {unit} />
				{/each}

				{#each calendarDays as { date, entry } (date)}
					<CalendarBlock {entry} {date} {unit} />
				{/each}

				{#each nextMonthDays() as { date, entry } (date)}
					<CalendarBlock isDisabled {entry} {date} {unit} />
				{/each}
			</div>
		{/if}
	</div>
</div>
