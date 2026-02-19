import { BrowserWindow, Menu, Notification, Tray, app, ipcMain, shell } from 'electron'
import { Conf, useConf } from 'electron-conf/main'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const conf = new Conf()
conf.registerRendererListener()

const NOTIFICATION_TITLES = [
	'💧 Hydration Time!',
	'🚰 Water Break!',
	'🌊 Stay Hydrated!',
	'💦 Drink Up!'
]

const NOTIFICATION_BODIES = [
	'Your body needs water to function properly.',
	'Drinking water helps maintain focus and energy.',
	'Time for a refreshing glass of water.',
	'Stay hydrated to keep your mind sharp.'
]

const DEFAULT_NOTIFICATION_INTERVAL_MS = 3600000

class HydrationTracker {
	private mainWindow: BrowserWindow | null = null
	private secondaryWindow: BrowserWindow | null = null
	private tray: Tray | null = null
	private notificationInterval: NodeJS.Timeout | null = null

	constructor(private readonly iconPath: string) {}

	public createApp() {
		this.createMainWindow()
		this.createTray()
		this.loadWindowContent()
		this.setupWindowEvents(this.mainWindow)
		this.setupIpcHandlers()
		this.setupNotificationSystem()

		conf.onDidChange('removeNotifications', () => this.setupNotificationSystem())
		conf.onDidChange('silenceNotification', () => this.setupNotificationSystem())
		conf.onDidChange('notificationInterval', () => this.setupNotificationSystem())
	}

	private createWindow(title: string) {
		return new BrowserWindow({
			title,
			width: 400,
			height: 560,
			show: false,
			resizable: false,
			maximizable: false,
			fullscreenable: false,
			frame: false,
			transparent: true,
			autoHideMenuBar: true,
			...(process.platform === 'linux' ? { icon: this.iconPath } : {}),
			webPreferences: {
				preload: join(__dirname, '../preload/index.js'),
				sandbox: false
			}
		})
	}

	private createMainWindow() {
		this.mainWindow = this.createWindow('Hydration Tracker')
	}

	private createSecondaryWindow() {
		if (!this.secondaryWindow || this.secondaryWindow?.isDestroyed()) {
			this.secondaryWindow = this.createWindow('Hydration Tracker - Calendar')

			this.setupWindowEvents(this.secondaryWindow)
			this.loadSecondaryWindowContent()
		} else {
			this.secondaryWindow.show()
		}
	}

	private setupWindowEvents(window: BrowserWindow | null) {
		window?.on('ready-to-show', () => {
			window.show()
		})

		window?.webContents.setWindowOpenHandler((details) => {
			shell.openExternal(details.url)
			return { action: 'deny' }
		})
	}

	private loadWindowContent() {
		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			this.mainWindow?.loadURL(process.env['ELECTRON_RENDERER_URL'])
		} else {
			this.mainWindow?.loadFile(join(__dirname, '../renderer/index.html'))
		}
	}

	private loadSecondaryWindowContent() {
		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			const devUrl = new URL(process.env['ELECTRON_RENDERER_URL'])
			devUrl.searchParams.set('mode', 'calendar')
			this.secondaryWindow?.loadURL(devUrl.toString())
		} else {
			this.secondaryWindow?.loadFile(join(__dirname, '../renderer/index.html'), {
				search: '?mode=calendar'
			})
		}
	}

	private setupIpcHandlers() {
		ipcMain.on('close-app', () => this.mainWindow?.close())
		ipcMain.on('hide-app', () => this.mainWindow?.hide())
		ipcMain.on('minimize-app', () => this.mainWindow?.minimize())
		ipcMain.on('open-calendar', () => this.createSecondaryWindow())
		ipcMain.on('close-calendar', () => this.secondaryWindow?.close())
		ipcMain.on('minimize-calendar', () => this.secondaryWindow?.minimize())
	}

	private toggleMainWindow() {
		if (this.mainWindow?.isVisible()) {
			this.mainWindow?.hide()
		} else {
			this.mainWindow?.show()
			this.mainWindow?.focus()
		}
	}

	private createTray() {
		this.tray = new Tray(this.iconPath)

		const menu = Menu.buildFromTemplate([
			{ label: 'Show App', click: () => this.mainWindow?.show() },
			{ label: 'Quit', click: () => app.quit() }
		])

		this.tray.setToolTip('Hydration Tracker')
		this.tray.setContextMenu(menu)

		this.tray.on('click', () => this.toggleMainWindow())
	}

	private getRandomNotification() {
		const randomTitle =
			NOTIFICATION_TITLES[Math.floor(Math.random() * NOTIFICATION_TITLES.length)]
		const randomBody =
			NOTIFICATION_BODIES[Math.floor(Math.random() * NOTIFICATION_BODIES.length)]

		return { title: randomTitle, body: randomBody }
	}

	private displayNotification(silent: boolean) {
		const { title, body } = this.getRandomNotification()

		const notification = new Notification({
			title,
			body,
			icon: this.iconPath,
			silent
		})

		notification.on('click', () => {
			if (!this.mainWindow?.isVisible()) {
				this.mainWindow?.show()
				this.mainWindow?.focus()
			}
		})

		notification.show()
	}

	private setupNotificationSystem() {
		if (this.notificationInterval) {
			clearInterval(this.notificationInterval)
		}

		const removeNotifications = (conf.get('removeNotifications') as boolean) || false
		if (removeNotifications) return

		const silenceNotifications = (conf.get('silenceNotifications') as boolean) || false
		const notificationInterval =
			(conf.get('notificationInterval') as number) || DEFAULT_NOTIFICATION_INTERVAL_MS

		this.notificationInterval = setInterval(
			() => this.displayNotification(silenceNotifications),
			notificationInterval
		)
	}
}

const initializeApp = () => {
	app.setName('Hydration Tracker')

	app.whenReady().then(() => {
		useConf()

		electronApp.setAppUserModelId('com.electron')

		app.on('browser-window-created', (_, window) => {
			optimizer.watchWindowShortcuts(window)
		})

		const hydrationTracker = new HydrationTracker(icon)
		hydrationTracker.createApp()

		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) {
				hydrationTracker.createApp()
			}
		})
	})

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			const closeAppToTray = conf.get('closeAppToTray')

			if (closeAppToTray) {
				app.hide()
			} else {
				app.quit()
			}
		}
	})
}

initializeApp()
