<script lang="ts">
	let { isSettings = $bindable() }: { isSettings: boolean } = $props()
</script>

<button
	onclick={() => (isSettings = !isSettings)}
	class="absolute top-2 left-12 w-9 h-9 bg-background border-3 border-foreground rounded cursor-pointer hover:bg-background-hover active:bg-background-active"
	title="{!isSettings ? 'open' : 'close'} settings"
>
	{!isSettings ? '⚙️' : '🏠'}
</button>
