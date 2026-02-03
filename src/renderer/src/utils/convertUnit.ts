import type { Unit } from '$interfaces/Unit'

export const convertValueToMl = (value: number, unit: Unit): number => {
	switch (unit) {
		case 'L':
			return value * 1000
		case 'floz':
			return value * 29.57353
		case 'cup':
			return value * 236.5882365
		default:
			return value
	}
}

export const convertValueFromMl = (value: number, unit: Unit): number => {
	switch (unit) {
		case 'L':
			return value / 1000
		case 'floz':
			return value * 0.0338140227
		case 'cup':
			return value * 0.0042267528
		default:
			return value
	}
}
