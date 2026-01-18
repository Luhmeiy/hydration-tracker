<script lang="ts">
	import HeaderButton from './HeaderButton.svelte'

	const closeWindow = (): void => window.electronAPI.closeApp()
	const minimizeWindow = (): void => window.electronAPI.minimizeApp()
</script>

<div class="flex">
	<h1 style="-webkit-app-region: drag" class="text-xl flex-1">Hydration Tracker</h1>

	<div class="flex gap-2 items-center">
		<HeaderButton action={minimizeWindow} bgColor="bg-minimize" />
		<HeaderButton action={closeWindow} bgColor="bg-close" />
	</div>
</div>
