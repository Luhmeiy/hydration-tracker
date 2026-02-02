<script lang="ts">
	import HeaderButton from './HeaderButton.svelte'

	interface HeaderProps {
		closeAppToTray: boolean
		isSettings: boolean
	}

	let { closeAppToTray, isSettings }: HeaderProps = $props()

	const closeWindow = (): void => window.api.closeApp()
	const hideWindow = (): void => window.api.hideApp()
	const minimizeWindow = (): void => window.api.minimizeApp()
</script>

<header class="flex">
	<h1 style="-webkit-app-region: drag" class="text-xl flex-1 select-none">
		{!isSettings ? 'Hydration Tracker' : 'Settings'}
	</h1>

	<div class="flex gap-2 items-center">
		<HeaderButton
			action={minimizeWindow}
			label="minimize window"
			bgColor="bg-minimize hover:bg-minimize-hover active:bg-minimize-active"
		/>
		<HeaderButton
			label="hide window"
			action={closeAppToTray ? hideWindow : closeWindow}
			bgColor="bg-close hover:bg-close-hover active:bg-close-active"
		/>
	</div>
</header>
