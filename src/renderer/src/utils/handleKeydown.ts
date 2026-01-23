export const handleKeydown = (e: KeyboardEvent, enter: () => void, exit: () => void): void => {
	if (e.key === 'Enter') {
		enter()
	} else if (e.key === 'Escape') {
		exit()
	}
}
