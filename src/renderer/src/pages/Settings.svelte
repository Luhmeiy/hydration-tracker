<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import ToggleSwitch from '../components/ToggleSwitch.svelte'

	const conf = new Conf()

	interface Settings {
		key: 'removeNotifications' | 'silenceNotifications' | 'notificationInterval'
		value: boolean | number
	}

	let { errorMessage = $bindable() }: { errorMessage: string } = $props()

	let removeNotifications = $state(false)
	let silenceNotifications = $state(false)
	let notificationInterval = $state(3600000)

	const updateConf = (key: Settings['key'], value: Settings['value']): void => {
		conf.set(key, value)
	}

	const changeNotificationInterval = (): void => {
		if (Number.isNaN(notificationInterval) || notificationInterval < 1) {
			errorMessage = 'Enter a valid number.'
			return
		}

		const minutesToMilliseconds = notificationInterval * 60 * 1000
		updateConf('notificationInterval', minutesToMilliseconds)
	}

	$effect(() => {
		const getSettings = async (): Promise<void> => {
			removeNotifications = ((await conf.get('removeNotifications')) as boolean) || false
			silenceNotifications = ((await conf.get('silenceNotifications')) as boolean) || false

			const storedNotificationInterval =
				((await conf.get('notificationInterval')) as number) || 3600000

			notificationInterval = storedNotificationInterval / 60 / 1000
		}

		getSettings()
	})
</script>

<section class="flex flex-col items-center gap-2">
	<h2 class="font-bold">Notifications</h2>

	<div class="flex flex-col gap-1 text-sm">
		<ToggleSwitch
			action={() => updateConf('removeNotifications', removeNotifications)}
			label="Remove notifications"
			bind:value={removeNotifications}
		/>

		<ToggleSwitch
			action={() => updateConf('silenceNotifications', silenceNotifications)}
			label="Silence notifications"
			bind:value={silenceNotifications}
		/>

		<div class="flex flex-col items-center">
			<h3 class="font-bold">Notification interval</h3>

			<div class="flex gap-2 items-center">
				<label for="water-add">(in minutes):</label>
				<input
					type="number"
					min="1"
					step="10"
					id="water-add"
					class="w-20 border-3 rounded-[2px] px-1"
					bind:value={notificationInterval}
					onchange={changeNotificationInterval}
				/>
			</div>
		</div>
	</div>
</section>
