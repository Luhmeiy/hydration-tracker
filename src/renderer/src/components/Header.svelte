<script lang="ts">
	import HeaderButton from './HeaderButton.svelte'

	const closeWindow = (): void => window.electronAPI.closeApp()
	const minimizeWindow = (): void => window.electronAPI.minimizeApp()
</script>

<header class="flex">
	<h1 style="-webkit-app-region: drag" class="text-xl flex-1 select-none">Hydration Tracker</h1>

	<div class="flex gap-2 items-center">
		<HeaderButton
			action={minimizeWindow}
			label="minimize window"
			bgColor="bg-minimize hover:bg-minimize-hover active:bg-minimize-active"
		/>
		<HeaderButton
			label="close window"
			action={closeWindow}
			bgColor="bg-close hover:bg-close-hover active:bg-close-active"
		/>
	</div>
</header>
