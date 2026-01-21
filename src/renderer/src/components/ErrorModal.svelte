<script lang="ts">
	import Modal from './Modal.svelte'

	let { errorMessage = $bindable() } = $props()

	$effect(() => {
		setTimeout(() => (errorMessage = ''), 5000)
	})
</script>

{#if errorMessage}
	<Modal close={() => (errorMessage = '')}>
		<h1 class="font-bold">Error</h1>
		<p class="text-center leading-5">{errorMessage}</p>
	</Modal>
{/if}
