<script lang="ts">
	import type { NewDate } from '$interfaces/NewDate'
	import Arrow from './Arrow.svelte'

	interface MonthSwitchProps {
		getNextDate: () => NewDate
		getPreviousDate: () => NewDate
		month: number
		year: number
	}

	let {
		month = $bindable(),
		year = $bindable(),
		getNextDate,
		getPreviousDate
	}: MonthSwitchProps = $props()

	let fullMonth = $derived(new Date(year, month - 1).toLocaleString('en', { month: 'long' }))

	const switchDate = (getDate: () => NewDate): void => {
		const { newYear, newMonth } = getDate()

		month = newMonth
		year = newYear
	}
</script>

<div class="flex gap-8">
	<Arrow direction="left" action={() => switchDate(getPreviousDate)} />
	<div class="text-center leading-3">
		<p class="text-sm">{year}</p>
		<h2 class="font-bold">{fullMonth}</h2>
	</div>
	<Arrow direction="right" action={() => switchDate(getNextDate)} />
</div>
