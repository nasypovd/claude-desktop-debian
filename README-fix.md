# Claude Desktop - Window Controls Fix

## Overview

This repository contains fixes for the missing window controls (close, minimize, settings buttons) issue in the Claude Desktop application for Debian Linux after the latest update.

## Quick Fix

For a quick automated fix, run the included script:

```bash
cd /home/damir/tmp/claude-desktop-debian
sudo ./fix-window-controls.sh
```

The script will:
1. Extract the app.asar file
2. Locate the MainWindowPage component
3. Apply the window controls fix
4. Repackage the app.asar file
5. Provide instructions for installing the modified package

## Manual Fix

If you prefer to apply the fix manually or if the script doesn't work for your specific version, follow these steps:

1. Follow the detailed instructions in `patch-instructions.md`
2. Use the code provided in `window-controls-fix.js` and `window-controls-api.js` to patch the application
3. Repackage and install the modified application

## Files Included

- `fix-window-controls.sh` - Automated script to apply the fix
- `window-controls-fix.js` - Modified window frame component with added window controls
- `window-controls-api.js` - Implementation of the window controls API
- `patch-instructions.md` - Detailed manual instructions
- `README-window-controls-fix.md` - Additional information about the fix

## Alternative Solutions

If you prefer not to modify the application code, consider these alternatives:

1. **Use Native Window Decorations**: 
   Extract the app.asar file and modify the BrowserWindow creation options to use `frame: true` instead of the custom frame.

2. **Wait for Official Fix**:
   This is a temporary fix until an official update addresses the issue.

## Troubleshooting

If you encounter issues after applying the fix:

1. **Restore the backup**:
   ```bash
   cd /home/damir/tmp/claude-desktop-debian/build/electron-app
   sudo cp app.asar.backup app.asar
   ```

2. **Check the logs**:
   Look for any errors in the application logs.

3. **Manual inspection**:
   Follow the steps in `patch-instructions.md` and manually inspect the code to ensure it matches your version of the application.

## Requirements

- Node.js and npm (for the asar tool)
- sudo privileges (for installing packages and modifying app files)
- Claude Desktop application installed from the Debian package

## Disclaimer

This fix is provided as-is without warranty. Use at your own risk.
