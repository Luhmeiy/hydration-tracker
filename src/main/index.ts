import { app, shell, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { Conf, useConf } from 'electron-conf/main'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const conf = new Conf()

conf.registerRendererListener()

function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		title: 'Hydration Tracker',
		width: 400,
		height: 560,
		show: false,
		resizable: false,
		maximizable: false,
		fullscreenable: false,
		frame: false,
		transparent: true,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	})

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}

	ipcMain.on('hide-app', () => {
		if (mainWindow) {
			mainWindow.hide()
		}
	})

	ipcMain.on('minimize-app', () => {
		if (mainWindow) {
			mainWindow.minimize()
		}
	})

	function createTray() {
		const tray = new Tray(icon)

		const menu = Menu.buildFromTemplate([
			{ label: 'Show App', click: () => mainWindow.show() },
			{ label: 'Quit', click: () => app.quit() }
		])

		tray.setToolTip('Hydration Tracker')
		tray.setContextMenu(menu)

		tray.on('click', toggleMainWindow)
	}

	function toggleMainWindow() {
		if (mainWindow.isVisible()) {
			mainWindow.hide()
		} else {
			const position = mainWindow.getNormalBounds()
			mainWindow.setPosition(position.x, position.y)

			mainWindow.show()
			mainWindow.focus()
		}
	}

	createTray()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	useConf()

	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron')

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.hide()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
