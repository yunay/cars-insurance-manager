import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import { autoUpdater } from 'electron-updater'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
    enableLiveReload({ strategy: 'react-hmr' });
}

const createWindow = async () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: { nodeIntegration: true }
    });

    mainWindow.setMenuBarVisibility(false);

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    autoUpdater.checkForUpdatesAndNotify();

    // Open the DevTools.
    //if (isDevMode) {
    //    await installExtension(REACT_DEVELOPER_TOOLS);
    //    mainWindow.webContents.openDevTools();
    //}

    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('app_version', (event: any) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});