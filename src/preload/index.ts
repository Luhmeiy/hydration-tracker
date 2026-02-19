import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
	closeApp: () => ipcRenderer.send('close-app'),
	hideApp: () => ipcRenderer.send('hide-app'),
	minimizeApp: () => ipcRenderer.send('minimize-app'),
	openCalendar: () => ipcRenderer.send('open-calendar'),
	closeCalendar: () => ipcRenderer.send('close-calendar'),
	minimizeCalendar: () => ipcRenderer.send('minimize-calendar')
}

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI)
		contextBridge.exposeInMainWorld('api', api)
	} catch (error) {
		console.error(error)
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI
	// @ts-ignore (define in dts)
	window.api = api
}
