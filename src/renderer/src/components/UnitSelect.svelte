<script lang="ts">
	import type { Unit } from '../interfaces/Unit'
	let { unit = $bindable() }: { unit: Unit } = $props()
</script>

<div class="flex flex-col gap-1 items-center">
	<h2 class="font-bold">Unit</h2>
	<select
		bind:value={unit}
		class="bg-lightblue border-3 border-darkblue px-2 py-1 rounded-[2px] cursor-pointer"
	>
		<option value="mL">mL</option>
		<option value="L" selected>L</option>
		<option value="floz">fl oz</option>
		<option value="cup">cups</option>
	</select>
</div>
