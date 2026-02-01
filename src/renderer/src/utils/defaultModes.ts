import type { Mode } from '$interfaces/Mode'

export const DEFAULT_MODE_SYMBOLS = new Map<Mode, string>([
	['light', '☀️'],
	['dark', '🌗'],
	['darker', '🌕']
])

export const DEFAULT_MODES = [...DEFAULT_MODE_SYMBOLS.keys()]
