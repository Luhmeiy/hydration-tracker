<script lang="ts">
	interface CalendarBlockProps {
		isAchieved?: boolean
		isDisabled?: boolean
	}

	let { isAchieved, isDisabled }: CalendarBlockProps = $props()
</script>

<div
	class="w-full aspect-square border-2 border-darkblue rounded-xs"
	class:border-zinc-500={isDisabled}
	class:bg-darkblue={isAchieved}
	class:bg-zinc-500={isDisabled && isAchieved}
></div>
