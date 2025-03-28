// Add this to the main process code or modify existing implementation
// This would typically be in the main electron.js file

// Window controls API handlers
const setupWindowControlsAPI = (mainWindow) => {
  // Expose window control methods to renderer
  ipcMain.handle('window-controls:minimize', () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  ipcMain.handle('window-controls:maximize', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.handle('window-controls:close', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });
};

// In the renderer process, this would be connected like:
window.mainProcess = window.mainProcess || {};
window.mainProcess.windowControlsApi = {
  minimize: () => window.electron.ipcRenderer.invoke('window-controls:minimize'),
  maximize: () => window.electron.ipcRenderer.invoke('window-controls:maximize'),
  close: () => window.electron.ipcRenderer.invoke('window-controls:close')
};
