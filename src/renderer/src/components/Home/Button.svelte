<script lang="ts">
	interface ButtonProps {
		action: () => void
		text: string
	}

	let { action, text }: ButtonProps = $props()
</script>

<button
	class="bg-lightblue border-3 border-darkblue px-2 py-1 rounded-[2px] cursor-pointer break-all hover:bg-lightblue-hover active:bg-lightblue-active"
	onclick={action}
>
	{text}
</button>
