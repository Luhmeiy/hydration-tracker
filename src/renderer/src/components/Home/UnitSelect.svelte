<script lang="ts">
	import { Conf } from 'electron-conf/renderer'
	import type { Unit } from '$interfaces/Unit'

	const conf = new Conf()

	let { unit = $bindable() }: { unit: Unit } = $props()

	const changeUnit = async (): Promise<void> => await conf.set('unit', unit)
</script>

<section class="flex flex-col gap-1 items-center">
	<h2 class="font-bold">Unit</h2>
	<select
		bind:value={unit}
		onchange={changeUnit}
		class="bg-lightblue border-3 border-darkblue px-2 py-1 rounded-[2px] cursor-pointer hover:bg-lightblue-hover"
	>
		<option value="mL">mL</option>
		<option value="L" selected>L</option>
		<option value="floz">fl oz</option>
		<option value="cup">cups</option>
	</select>
</section>
