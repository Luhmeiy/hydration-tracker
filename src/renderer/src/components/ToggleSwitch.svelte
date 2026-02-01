<script lang="ts">
	interface ToggleSwitchProps {
		action: () => void
		label: string
		value: boolean
	}

	let { value = $bindable(), action, label }: ToggleSwitchProps = $props()
</script>

<label class="w-full flex items-center gap-3 cursor-pointer">
	<span>{label}</span>
	<input type="checkbox" class="sr-only peer" bind:checked={value} onchange={action} />
	<div
		class="relative w-9 h-5 bg-zinc-500 rounded-full peer after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform dark:after:bg-zinc-800 darker:after:bg-zinc-950 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:bg-darkblue"
	></div>
</label>
