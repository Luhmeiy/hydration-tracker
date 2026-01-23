<script lang="ts">
	import type { Snippet } from 'svelte'
	import { handleKeydown } from '../utils/handleKeydown'

	interface InputSwitchProps {
		children: Snippet
		action: (value: string | number) => Promise<boolean>
		value: string | number
		isPreset?: boolean
		isText?: boolean
	}

	let { children, action, value, isPreset, isText }: InputSwitchProps = $props()

	let inputRef = $state<HTMLInputElement>()
	let tempValue = $derived<string | number>(value)
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
			<label for="water-goal">(in mL):</label>
		{/if}

		<input
			type={isText ? 'text' : 'number'}
			min="0"
			step="100"
			id="water-goal"
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
		class="h-8 flex items-center {isText
			? 'text-start'
			: 'justify-end'} cursor-pointer hover:text-darkblue-hover active:text-darkblue-active"
		onclick={() => (isEditing = true)}
	>
		{@render children()}
	</button>
{/if}
