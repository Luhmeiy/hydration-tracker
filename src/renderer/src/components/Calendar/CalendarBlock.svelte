<script lang="ts">
	import type { CalendarEntry } from '$interfaces/Calendar'

	interface CalendarBlockProps {
		day?: CalendarEntry
		isDisabled?: boolean
	}

	let { day, isDisabled }: CalendarBlockProps = $props()

	let isAchieved = day?.isAchieved || false
</script>

<div
	class="w-full aspect-square border-2 border-darkblue rounded-xs"
	class:border-zinc-500={isDisabled}
	class:bg-darkblue={isAchieved}
	class:bg-zinc-500={isDisabled && isAchieved}
></div>
