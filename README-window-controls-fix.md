# Claude Desktop Window Controls Fix

This directory contains files to fix the missing window controls (close, minimize, settings) issue in the Claude Desktop application for Debian Linux.

## Files Included

1. `window-controls-fix.js` - Modified window frame component code with added window control buttons
2. `window-controls-api.js` - Implementation of the window controls API for the main process
3. `patch-instructions.md` - Detailed step-by-step instructions on how to apply the fix

## Quick Start

To fix the missing window controls:

1. Follow the detailed instructions in `patch-instructions.md`
2. Use the code provided in `window-controls-fix.js` and `window-controls-api.js` to patch the application
3. Repackage and install the modified application

## Requirements

- Node.js and npm installed (for the asar tool)
- Basic knowledge of Electron applications
- Access to the Claude Desktop Debian package

## Alternative Approaches

If you don't want to modify the app code, you can try these alternatives:

1. **Use Native Window Decorations**: Modify the BrowserWindow creation options to use `frame: true`
2. **Use a Previous Version**: If a previous version of Claude Desktop had working window controls, you can downgrade until an official fix is released

## Future Updates

When a new version of Claude Desktop is released, you might need to reapply this fix if the issue persists. Keep these files for reference in case you need to fix future versions.

## Contribution

If you improve this fix or find alternative solutions, please share them with the community.
