<script>
	import ErrorModal from '$components/ErrorModal.svelte'
	import Header from '$components/Header.svelte'
	import SettingsButton from '$components/SettingsButton.svelte'
	import Home from '$pages/Home.svelte'
	import Settings from '$pages/Settings.svelte'

	let isSettings = $state(false)
	let errorMessage = $state('')
</script>

<div
	class="bg-lightblue max-h-dvh flex flex-col gap-1 p-2 font-silkscreen border-3 border-darkblue rounded-lg text-darkblue overflow-x-hidden transition-colors duration-500 **:transition-colors **:duration-500"
>
	<Header {isSettings} />

	<div
		class="relative h-full bg-white flex flex-col items-center gap-4 px-2 py-6 border-3 border-darkblue rounded-b-lg overflow-y-auto dark:bg-zinc-800 darker:bg-zinc-950"
	>
		<ErrorModal bind:errorMessage />
		<SettingsButton bind:isSettings />

		{#if !isSettings}
			<Home bind:errorMessage />
		{:else}
			<Settings bind:errorMessage />
		{/if}
	</div>
</div>
