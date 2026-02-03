<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { Unit } from '$interfaces/Unit'
	import { convertValueFromMl } from '$utils/convertUnit'
	import { handleKeydown } from '$utils/handleKeydown'

	interface InputSwitchProps {
		children: Snippet
		action: (value: string | number) => Promise<boolean>
		unit: Unit
		value: string | number
		isPreset?: boolean
		isText?: boolean
	}

	let { children, action, unit, value, isPreset, isText }: InputSwitchProps = $props()

	let inputRef = $state<HTMLInputElement>()
	let tempValue = $derived<string | number>(
		typeof value === 'number' ? convertValueFromMl(value, unit) : value
	)
	let isEditing = $state(false)

	$effect(() => {
		if (isEditing && inputRef) {
			inputRef.focus()
		}
	})
</script>

{#if isEditing}
	<div class="flex gap-2 items-center">
		{#if !isPreset}
			<label for="water">(in {unit}):</label>
		{/if}

		<input
			type={isText ? 'text' : 'number'}
			min="0"
			step="100"
			id="water"
			class="{isText ? 'w-full' : 'w-20'} border-3 rounded-[2px] px-1"
			bind:this={inputRef}
			bind:value={tempValue}
			onblur={() => (isEditing = false)}
			onkeydown={(e) =>
				handleKeydown(
					e,
					() => action(tempValue).then((result) => (isEditing = result)),
					() => (isEditing = false)
				)}
		/>
	</div>
{:else}
	<button
		class="min-h-8 flex items-center {isText
			? 'text-start'
			: 'justify-end'} cursor-pointer break-all leading-4 hover:text-darkblue-hover active:text-darkblue-active"
		onclick={() => (isEditing = true)}
		title="edit value"
	>
		{@render children()}
	</button>
{/if}
