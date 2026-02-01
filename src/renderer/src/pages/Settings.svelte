<script lang="ts">
	import NotificationsSection from '$components/Settings/NotificationsSection.svelte'

	let { errorMessage = $bindable() }: { errorMessage: string } = $props()
</script>

<NotificationsSection bind:errorMessage />
