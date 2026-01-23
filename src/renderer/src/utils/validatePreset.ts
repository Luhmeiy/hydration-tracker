import type { Preset } from './../interfaces/Preset'

export const validatePreset = (
	presets: Preset[],
	value: string | number,
	key: 'name' | 'value'
): string | null => {
	if (typeof value === 'number' && value <= 0) {
		return 'Enter a valid number.'
	}

	if (typeof value === 'string' && !value.trim()) {
		return 'Preset name is required.'
	}

	if (presets.some((preset) => preset[key] === value)) {
		return `Preset ${key} already in use.`
	}

	return null
}
