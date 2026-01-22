<script lang="ts">
	let { action, label, bgColor }: { action: () => void; label: string; bgColor: string } =
		$props()
</script>

<button
	class="h-5 w-5 {bgColor} border-3 border-darkblue rounded-full cursor-pointer"
	aria-label={label}
	onclick={action}
></button>
