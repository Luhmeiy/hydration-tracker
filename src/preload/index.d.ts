import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
	interface Window {
		electron: ElectronAPI
		api: {
			closeApp: () => void
			hideApp: () => void
			minimizeApp: () => void
			openCalendar: () => void
			closeCalendar: () => void
			minimizeCalendar: () => void
			onConfigChange: (update: () => void) => () => void
		}
	}
}
