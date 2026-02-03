<script lang="ts">
	import type { Unit } from '$interfaces/Unit'
	import { convertValueFromMl } from '$utils/convertUnit'

	interface WaterDisplayProps {
		unit: Unit
		water: number
	}

	let { unit, water }: WaterDisplayProps = $props()

	let convertedWater = $derived(() => convertValueFromMl(water, unit))
</script>

{+convertedWater().toFixed(3)}
{unit}
