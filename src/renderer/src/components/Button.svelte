<script lang="ts">
	let { action, text }: { action: () => void; text: string } = $props()
</script>

<button
	class="bg-lightblue border-3 border-darkblue px-2 py-1 rounded-[2px] cursor-pointer hover:bg-lightblue-hover active:bg-lightblue-active"
	onclick={action}
>
	{text}
</button>
