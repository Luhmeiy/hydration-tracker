<script lang="ts">
	import { computePosition, offset, shift } from '@floating-ui/dom'
	import type { CalendarEntry } from '$interfaces/Calendar'
	import type { Unit } from '$interfaces/Unit'
	import GoalSymbol from '$components/Home/GoalSymbol.svelte'
	import WaterDisplay from '$components/Home/WaterDisplay.svelte'

	interface CalendarBlockProps {
		date: string
		entry: CalendarEntry | null
		unit: Unit
		isDisabled?: boolean
	}

	let { entry, date, isDisabled, unit }: CalendarBlockProps = $props()

	let isAchieved = $derived(entry?.isAchieved || false)
	let formattedDate = $derived(new Date(date + 'T00:00:00').toLocaleDateString())

	let displayTooltip = $state(false)

	let block = $state<HTMLDivElement>()
	let tooltip = $state<HTMLDivElement>()

	$effect(() => {
		if (block && tooltip) {
			computePosition(block, tooltip, {
				placement: 'top',
				middleware: [offset(4), shift({ padding: 8 })]
			}).then(({ x, y }) => {
				Object.assign(tooltip.style, {
					left: `${x}px`,
					top: `${y}px`
				})
			})
		}
	})
</script>

<div
	class="w-full aspect-square border-2 border-darkblue rounded-xs"
	class:border-zinc-500={isDisabled}
	class:bg-darkblue={isAchieved}
	class:bg-zinc-500={isDisabled && isAchieved}
	onmousemove={() => (displayTooltip = true)}
	onmouseleave={() => (displayTooltip = false)}
	onfocus={() => (displayTooltip = true)}
	onblur={() => (displayTooltip = false)}
	role="presentation"
	bind:this={block}
></div>

{#if date && displayTooltip}
	<div
		class="absolute flex flex-col items-center bg-white dark:bg-zinc-800 darker:bg-zinc-950 text-sm border-2 border-darkblue px-2 py-1 rounded-xs"
		bind:this={tooltip}
	>
		<p class="font-bold">
			{formattedDate}
		</p>

		{#if entry}
			<p>
				<WaterDisplay {unit} water={entry.waterTotal} />
				/
				<WaterDisplay {unit} water={entry.waterGoal} />
			</p>

			{#if entry.isAchieved}
				<p>
					<GoalSymbol isGoalAchieved={entry.isAchieved} />
					Goal achieved
					<GoalSymbol isGoalAchieved={entry.isAchieved} />
				</p>
			{/if}
		{:else}
			<p>No metrics found.</p>
		{/if}
	</div>
{/if}
