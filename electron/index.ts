import { join } from 'path';
import { BrowserWindow, app, ipcMain, nativeTheme } from 'electron';
import isDev from 'electron-is-dev';
import { setupMinimizeHandler } from './ipcHandlers/windowHandler';
import { collectionHandler } from './ipcHandlers/collectionHandler';

function createWindow() {
  const window = new BrowserWindow({
    height: 400,
    width: 1200,
    minWidth: 400,
    minHeight: 720,
    frame: true,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../dist-vite/index.html');

  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }


  setupMinimizeHandler();
  // Collection IPC handlers
  collectionHandler();

  // Other IPC handlers
  ipcMain.on('close', () => {
    window.close();
  });

  nativeTheme.themeSource = 'dark';
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});