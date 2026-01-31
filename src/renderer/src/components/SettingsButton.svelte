<script lang="ts">
	let { isSettings = $bindable() }: { isSettings: boolean } = $props()
</script>

<button
	onclick={() => (isSettings = !isSettings)}
	class="absolute top-2 left-2 w-9 h-9 bg-lightblue border-3 border-darkblue rounded cursor-pointer hover:bg-lightblue-hover active:bg-lightblue-active"
	title="{!isSettings ? 'open' : 'close'} settings"
>
	{!isSettings ? '⚙️' : '🏠'}
</button>
