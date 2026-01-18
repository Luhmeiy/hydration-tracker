<script lang="ts">
	let { action, text }: { action: () => void; text: string } = $props()
</script>

<button
	class="bg-lightblue border-3 border-darkblue px-2 py-1 rounded-[2px] cursor-pointer"
	onclick={action}
>
	{text}
</button>
