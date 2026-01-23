<script lang="ts">
	import type { Unit } from '../interfaces/Unit'

	interface WaterDisplayProps {
		unit: Unit
		water: number
	}

	let { unit, water }: WaterDisplayProps = $props()

	let convertedWater = $derived(() => {
		switch (unit) {
			case 'L':
				return water / 1000
			case 'floz':
				return water * 0.0338140227
			case 'cup':
				return water * 0.0042267528
			default:
				return water
		}
	})
</script>

{+convertedWater().toFixed(3)}
{unit}
