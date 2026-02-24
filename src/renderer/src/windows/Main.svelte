<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import { onMount } from 'svelte'
	import CalendarButton from '$components/CalendarButton.svelte'
	import ErrorModal from '$components/ErrorModal.svelte'
	import Header from '$components/Header.svelte'
	import SettingsButton from '$components/SettingsButton.svelte'
	import Home from '$pages/Home.svelte'
	import Settings from '$pages/Settings.svelte'

	const conf = new Conf()

	let isSettings = $state(false)
	let closeAppToTray = $state(true)
	let errorMessage = $state('')

	onMount(async () => {
		closeAppToTray = ((await conf.get('closeAppToTray')) as boolean) ?? true
	})
</script>

<div
	class="bg-background max-h-dvh flex flex-col gap-1 p-2 font-silkscreen border-3 border-foreground rounded-lg text-foreground overflow-x-hidden transition-colors duration-500 **:transition-colors **:duration-500"
>
	<Header {closeAppToTray} headerTitle={!isSettings ? 'Hydration Tracker' : 'Settings'} />

	<div
		class="relative h-full bg-white flex flex-col items-center gap-4 px-2 py-6 border-3 border-foreground rounded-b-lg overflow-y-auto dark:bg-zinc-800 darker:bg-zinc-950"
	>
		<ErrorModal bind:errorMessage />
		<SettingsButton bind:isSettings />
		<CalendarButton />

		{#if !isSettings}
			<Home bind:errorMessage />
		{:else}
			<Settings bind:closeAppToTray bind:errorMessage />
		{/if}
	</div>
</div>
