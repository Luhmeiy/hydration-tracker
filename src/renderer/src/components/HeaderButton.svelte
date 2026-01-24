<script lang="ts">
	interface HeaderButtonProps {
		action: () => void
		bgColor: string
		label: string
	}

	let { action, bgColor, label }: HeaderButtonProps = $props()
</script>

<button
	class="h-5 w-5 {bgColor} border-3 border-darkblue rounded-full cursor-pointer"
	aria-label={label}
	title={label}
	onclick={action}
></button>
