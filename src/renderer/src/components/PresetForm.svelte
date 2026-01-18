<script lang="ts">
	import type { Preset } from '../interfaces/Preset'

	let { presets = $bindable(), waterToAdd }: { presets: Preset[]; waterToAdd: number } = $props()

	let presetName = $state('')
	let isAddingPreset = $state(false)
	let presetError = $state('')

	const startAdding = (): void => {
		isAddingPreset = true
		presetError = ''
	}

	const cleanPreset = (): void => {
		presetName = ''
		isAddingPreset = false
	}

	const validatePreset = (): string | null => {
		if (!waterToAdd || waterToAdd <= 0) {
			return 'Enter a valid number.'
		}

		if (!presetName.trim()) {
			return 'Preset name is required.'
		}

		if (presets.some((preset) => preset.value === waterToAdd)) {
			return 'Preset value already in use.'
		}

		if (presets.some((preset) => preset.name === presetName)) {
			return 'Preset name already in use.'
		}

		return null
	}

	const addPreset = (): void => {
		presetError = validatePreset()

		if (presetError) {
			cleanPreset()

			setTimeout(() => (presetError = ''), 5000)

			return
		}

		presets = [...presets, { name: presetName.trim(), value: waterToAdd }]

		cleanPreset()
	}

	const handleKeydown = (e: KeyboardEvent): void => {
		if (e.key === 'Enter') {
			addPreset()
		} else if (e.key === 'Escape') {
			isAddingPreset = false
		}
	}
</script>

<div class="flex flex-col">
	<button class="cursor-pointer" onclick={startAdding}>Add as preset</button>

	{#if presetError}
		<p>{presetError}</p>
	{/if}
</div>

{#if isAddingPreset}
	<div class="absolute bg-white left-1/2 top-1/2 -translate-1/2">
		<button class="absolute right-1 top-1 cursor-pointer" onclick={cleanPreset}>x</button>

		<div class="flex flex-col gap-2">
			<label for="preset-add">Preset name:</label>
			<input
				type="text"
				id="preset-add"
				class="w-32"
				bind:value={presetName}
				onkeydown={handleKeydown}
			/>
		</div>

		<button class="cursor-pointer" onclick={addPreset}>Add preset</button>
	</div>
{/if}
