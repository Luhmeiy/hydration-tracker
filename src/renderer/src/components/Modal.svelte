<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children, close }: { children: Snippet; close: () => void } = $props()
</script>

<div
	class="absolute w-72 bg-white left-1/2 top-1/2 -translate-1/2 flex flex-col gap-2 items-center border-3 border-darkblue px-4 py-2 dark:bg-zinc-800 darker:bg-zinc-950"
>
	<button class="absolute right-2 top-1 font-bold text-close cursor-pointer" onclick={close}>
		x
	</button>

	{@render children()}
</div>
