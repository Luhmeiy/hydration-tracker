<script lang="ts">
	import NotificationsSection from '$components/Settings/NotificationsSection.svelte'
	import ThemesSection from '$components/Settings/ThemesSection.svelte'

	let { errorMessage = $bindable() }: { errorMessage: string } = $props()
</script>

<NotificationsSection bind:errorMessage />
<ThemesSection />
