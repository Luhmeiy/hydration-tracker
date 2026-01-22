<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Preset } from '../interfaces/Preset'

	const conf = new Conf()

	let {
		presets = $bindable(),
		errorMessage = $bindable(),
		name,
		key,
		value
	}: {
		presets: Preset[]
		errorMessage: string
		name: string
		key: string
		value: string | number
	} = $props()

	let isEditing = $state(false)
	let tempValue: string | number = $state()

	let inputRef: HTMLInputElement = $state()

	const startEditing = (): void => {
		tempValue = value
		isEditing = true
	}

	const validatePreset = (): string | null => {
		if (typeof tempValue === 'number' && tempValue <= 0) {
			return 'Enter a valid number.'
		}

		if (typeof tempValue === 'string' && !tempValue.trim()) {
			return 'Preset name is required.'
		}

		if (presets.some((preset) => preset[key] === tempValue)) {
			return `Preset ${key} already in use.`
		}

		return null
	}

	const editPreset = async (): Promise<void> => {
		errorMessage = validatePreset()
		if (errorMessage) return

		presets = presets.map((preset) => {
			if (preset.name === name) {
				return { ...preset, [key]: tempValue }
			}

			return preset
		})

		isEditing = false

		await conf.set('presets', JSON.stringify(presets))
	}

	const handleKeydown = (e: KeyboardEvent): void => {
		if (e.key === 'Enter') {
			editPreset()
		} else if (e.key === 'Escape') {
			isEditing = false
		}
	}

	$effect(() => {
		if (isEditing && inputRef) {
			inputRef.focus()
		}
	})
</script>

{#if isEditing}
	<input
		type={key === 'name' ? 'text' : 'number'}
		min="0"
		step="100"
		class="{key === 'name' ? 'w-full' : 'w-20'} border-3 rounded-[2px] px-1"
		bind:this={inputRef}
		bind:value={tempValue}
		onblur={() => (isEditing = false)}
		onkeydown={handleKeydown}
	/>
{:else}
	<button
		class="h-8 flex items-center {key === 'name'
			? 'text-start'
			: 'justify-end'} cursor-pointer hover:text-darkblue-hover active:text-darkblue-active"
		onclick={startEditing}
	>
		{value}
	</button>
{/if}
