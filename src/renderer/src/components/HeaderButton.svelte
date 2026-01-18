<script lang="ts">
	let { action, bgColor }: { action: () => void; bgColor: string } = $props()
</script>

<button
	class="h-5 w-5 {bgColor} border-3 border-darkblue rounded-full cursor-pointer"
	aria-label="minimize"
	onclick={action}
></button>
