<script lang="ts">
	import Modal from './Modal.svelte'

	let {
		errorMessage = $bindable()
	}: {
		errorMessage: string | null
	} = $props()

	$effect(() => {
		if (errorMessage) {
			setTimeout(() => (errorMessage = ''), 5000)
		}
	})
</script>

{#if errorMessage}
	<Modal close={() => (errorMessage = '')} z="z-30">
		<h1 class="font-bold">Error</h1>
		<p class="text-center leading-5">{errorMessage}</p>
	</Modal>
{/if}
