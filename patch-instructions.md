# Fixing Missing Window Controls in Claude Desktop for Debian

The issue with missing window buttons (close, minimize, settings) after the latest update appears to be related to the window frame implementation in the Electron app. The window controls were either removed or not properly implemented in the Linux version.

## Solution

### 1. Extract the app.asar file

First, you need to extract the app.asar file to modify its contents:

```bash
cd /home/damir/tmp/claude-desktop-debian/build/electron-app
mkdir app_extracted
npx asar extract app.asar app_extracted
```

### 2. Modify the MainWindowPage component

Locate the MainWindowPage component file in the extracted directory:

```bash
cd app_extracted/.vite/renderer/main_window/assets/
```

Look for a file named `MainWindowPage-*.js` (the exact name may vary with different versions).

Replace the `u` function (the window frame component) with the modified version provided in the "window-controls-fix.js" file. This adds the window control buttons to the right side of the title bar.

### 3. Implement the Window Controls API

If the window controls API is not already implemented in the main process:

1. Find the main process file, typically in the root of the extracted directory or in a 'main' folder
2. Add the window controls API implementation from the "window-controls-api.js" file
3. Make sure the IPC handlers are set up correctly

### 4. Repackage the app.asar file

Once you've made the changes, repackage the app:

```bash
cd /home/damir/tmp/claude-desktop-debian/build/electron-app
npx asar pack app_extracted app.asar
```

### 5. Install the modified package

After repackaging, you can install the modified package:

```bash
sudo dpkg -i /home/damir/tmp/claude-desktop-debian/build/claude-desktop_*.deb
```

## Alternative: Quick Fix with Frame Setting

If you prefer a simpler solution that uses the system's native window decorations instead of custom ones, you can modify the Electron BrowserWindow creation to use the system's frame:

1. Extract the app.asar as shown above
2. Find the file that creates the main window (typically in the main process code)
3. Look for the BrowserWindow creation options, and set `frame: true`
4. Repackage and install

This will use your system's window manager to provide the window controls, although it won't match the Claude Desktop design.

## Troubleshooting

If the changes don't work, make sure that:

1. The window control buttons have the correct event handlers
2. The IPC channel names match between the renderer and main process
3. The styles are correctly applied and visible in your theme

You may need to adjust the CSS for your specific theme (light or dark) to ensure the window controls are visible.
