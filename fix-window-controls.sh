#!/bin/bash
# Script to fix missing window controls in Claude Desktop for Debian

set -e  # Exit on error

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run with sudo to ensure proper permissions"
  exit 1
fi

# Directory setup
BASE_DIR=$(pwd)
ELECTRON_APP_DIR="$BASE_DIR/build/electron-app"
EXTRACTED_DIR="$ELECTRON_APP_DIR/app_extracted"

echo "📦 Extracting app.asar file..."
if [ ! -d "$ELECTRON_APP_DIR" ]; then
  echo "❌ Error: Could not find electron-app directory at $ELECTRON_APP_DIR"
  exit 1
fi

# Install asar if needed
if ! command -v npx &> /dev/null; then
  echo "Installing npx..."
  apt update
  apt install -y npm
fi

# Extract the app.asar file
cd "$ELECTRON_APP_DIR"
mkdir -p "$EXTRACTED_DIR"
npx asar extract app.asar "$EXTRACTED_DIR"

echo "🔍 Finding MainWindowPage component..."
MAIN_WINDOW_PAGE=$(find "$EXTRACTED_DIR/.vite/renderer/main_window/assets" -name "MainWindowPage-*.js" | head -1)

if [ -z "$MAIN_WINDOW_PAGE" ]; then
  echo "❌ Error: Could not find MainWindowPage component"
  exit 1
fi

echo "Found MainWindowPage at: $MAIN_WINDOW_PAGE"

echo "📝 Backing up original file..."
cp "$MAIN_WINDOW_PAGE" "${MAIN_WINDOW_PAGE}.backup"

echo "🔧 Applying window controls fix..."
# We need to modify the file - this is a bit tricky in a script
# We'll look for the u function and replace it with our version

# Get line numbers for the function
START_LINE=$(grep -n "function u({isMainWindow:" "$MAIN_WINDOW_PAGE" | cut -d: -f1)
if [ -z "$START_LINE" ]; then
  echo "❌ Error: Could not find u function in MainWindowPage component"
  exit 1
fi

echo "Found u function starting at line $START_LINE"
echo "Replacing function with fixed version..."

# Replace the function with our fixed version
cat "$BASE_DIR/window-controls-fix.js" > /tmp/window-controls-fix.js
sed -i "s/\/\/ Modified function for MainWindowPage component to add window controls//" /tmp/window-controls-fix.js
sed -i "s/\/\/ This should be added to \.\/build\/electron-app\/app\.asar\.contents\/\.vite\/renderer\/main_window\/assets\/MainWindowPage-DAp51Uug\.js//" /tmp/window-controls-fix.js

# Find where the function ends
END_LINE=$(tail -n +$START_LINE "$MAIN_WINDOW_PAGE" | grep -n "^}" | head -1 | cut -d: -f1)
END_LINE=$((START_LINE + END_LINE - 1))

echo "Function ends at line $END_LINE"

# Replace the function
head -n $((START_LINE - 1)) "$MAIN_WINDOW_PAGE" > /tmp/new_main_window_page.js
cat /tmp/window-controls-fix.js >> /tmp/new_main_window_page.js
tail -n +$((END_LINE + 1)) "$MAIN_WINDOW_PAGE" >> /tmp/new_main_window_page.js

# Apply the changes
mv /tmp/new_main_window_page.js "$MAIN_WINDOW_PAGE"

echo "📦 Repackaging app.asar..."
# Create a backup of the original app.asar
cp "$ELECTRON_APP_DIR/app.asar" "$ELECTRON_APP_DIR/app.asar.backup"

# Repackage
cd "$ELECTRON_APP_DIR"
npx asar pack "$EXTRACTED_DIR" app.asar

echo "✅ Fix applied successfully!"
echo "The app.asar file has been modified and repackaged."
echo "A backup of the original app.asar is at $ELECTRON_APP_DIR/app.asar.backup"
echo ""
echo "To install the modified package, run:"
echo "  sudo dpkg -i $BASE_DIR/build/claude-desktop_*.deb"
echo ""
echo "If you encounter any issues, check the $BASE_DIR/patch-instructions.md file for detailed instructions."
