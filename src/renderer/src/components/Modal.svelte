<script lang="ts">
	import type { Snippet } from 'svelte'

	interface ModalProps {
		children: Snippet
		close: () => void
		z?: string
	}

	let { children, close, z }: ModalProps = $props()
</script>

<div
	class="absolute w-72 bg-white left-1/2 top-1/2 -translate-1/2 flex flex-col gap-2 items-center border-3 border-darkblue px-4 py-2 z-20 dark:bg-zinc-800 darker:bg-zinc-950 {z}"
>
	<button
		class="absolute right-2 top-1 font-bold text-close cursor-pointer hover:text-close-hover active:text-close-active"
		onclick={close}
	>
		x
	</button>

	{@render children()}
</div>
