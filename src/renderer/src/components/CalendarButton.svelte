<script lang="ts">
	const openCalendar = (): void => window.api.openCalendar()
</script>

<button
	onclick={openCalendar}
	class="absolute top-2 left-2 w-9 h-9 bg-lightblue border-3 border-darkblue rounded cursor-pointer hover:bg-lightblue-hover active:bg-lightblue-active"
	title="open calendar"
>
	🗓️
</button>
