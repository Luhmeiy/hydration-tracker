export const validateNumber = (value: number): string | null => {
	if (Number.isNaN(value) || value <= 0) {
		return 'Enter a valid number.'
	}

	return null
}
