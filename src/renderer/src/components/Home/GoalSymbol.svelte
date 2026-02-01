<script lang="ts">
	let { isGoalAchieved }: { isGoalAchieved: boolean } = $props()
	let goalSymbol = $derived(isGoalAchieved ? '🎉' : '')
</script>

<span class="select-none transition-transform! duration-200! hover:rotate-20 hover:scale-110">
	{goalSymbol}
</span>
