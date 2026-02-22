<script lang="ts">
	let { action, direction }: { action: () => void; direction: 'left' | 'right' } = $props()
</script>

<button
	class="text-xl select-none cursor-pointer transition-transform! duration-200! hover:scale-110"
	class:hover:-rotate-20={direction === 'left'}
	class:hover:rotate-20={direction === 'right'}
	onclick={action}
>
	{direction === 'left' ? '⬅️' : '➡️'}
</button>
