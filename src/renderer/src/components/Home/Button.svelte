<script lang="ts">
	interface ButtonProps {
		action: () => void
		text: string
	}

	let { action, text }: ButtonProps = $props()
</script>

<button
	class="bg-background border-3 border-foreground px-2 py-1 rounded-[2px] cursor-pointer break-all hover:bg-background-hover active:bg-background-active"
	onclick={action}
>
	{text}
</button>
