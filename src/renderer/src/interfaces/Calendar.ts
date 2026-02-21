export interface CalendarEntry {
	waterGoal: number
	waterTotal: number
	isAchieved: boolean
}

export interface Calendar {
	[key: string]: CalendarEntry
}
