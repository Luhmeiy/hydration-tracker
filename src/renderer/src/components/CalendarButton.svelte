<script lang="ts">
	const toggleCalendar = (): void => window.api.toggleCalendar()
</script>

<button
	onclick={toggleCalendar}
	class="absolute top-2 left-2 w-9 h-9 bg-background border-3 border-foreground rounded cursor-pointer hover:bg-background-hover active:bg-background-active"
	title="open calendar"
>
	🗓️
</button>
