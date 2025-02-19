// ipcHandlers/minimizeHandler.ts
import { BrowserWindow, ipcMain } from 'electron';

export function setupMinimizeHandler() {
    ipcMain.handle('minimize', (event) => {
        const window = BrowserWindow.fromWebContents(event.sender);
        if (window) {
            if (window.isMinimized()) {
                window.restore();
                return 'Window restored!';
            } else {
                window.minimize();
                return 'Window minimized!';
            }
        }
        return 'No window found!';
    });
}