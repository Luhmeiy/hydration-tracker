<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import ToggleSwitch from './ToggleSwitch.svelte'

	const conf = new Conf()

	let { closeAppToTray = $bindable() }: { closeAppToTray: boolean } = $props()

	const handleCloseAppToTray = async (): Promise<void> => {
		await conf.set('closeAppToTray', closeAppToTray)
	}
</script>

<section class="flex flex-col items-center gap-2">
	<h2 class="font-bold">System</h2>

	<div class="w-60 flex flex-col gap-1 text-sm">
		<ToggleSwitch
			bind:value={closeAppToTray}
			action={handleCloseAppToTray}
			label="Close app to tray*"
		/>

		<p class="text-xs text-center">*Notifications will be disabled if this is turned off</p>
	</div>
</section>
