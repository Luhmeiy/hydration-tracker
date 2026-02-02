<script lang="ts">
	import NotificationsSection from '$components/Settings/NotificationsSection.svelte'
	import SystemSection from '$components/Settings/SystemSection.svelte'
	import ThemesSection from '$components/Settings/ThemesSection.svelte'

	interface SettingsProps {
		closeAppToTray: boolean
		errorMessage: string
	}

	let { closeAppToTray = $bindable(), errorMessage = $bindable() }: SettingsProps = $props()
</script>

<SystemSection bind:closeAppToTray />
<NotificationsSection bind:errorMessage {closeAppToTray} />
<ThemesSection />
