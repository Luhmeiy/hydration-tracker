<script lang="ts">
	import { onMount } from 'svelte'
	import Calendar from './windows/Calendar.svelte'
	import Main from './windows/Main.svelte'

	let mode = $state()

	onMount(() => {
		const url = new URL(window.location.href)
		const queryParams = new URLSearchParams(url.search)

		mode = queryParams.get('mode') || 'main'
	})
</script>

{#if mode === 'main'}
	<Main />
{:else}
	<Calendar />
{/if}
