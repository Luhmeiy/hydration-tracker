<script lang="ts">
	import type { Unit } from '../interfaces/Unit'
	let { unit = $bindable() }: { unit: Unit } = $props()
</script>

<select bind:value={unit}>
	<option value="mL">mL</option>
	<option value="L" selected>L</option>
	<option value="floz">fl oz</option>
	<option value="cup">cups</option>
</select>
