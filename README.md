# Network Request Tracker Chrome Extension

**Network Request Tracker** is a Chrome extension that monitors and displays the count of successfully completed network requests for the current tab. The extension updates the count in real-time, allowing users to track network activity on a page.

## Contents

- manifest.json
- background.js
- popup.html
- popup.js
- Icons (icon16.png, icon48.png, icon128.png)

## File Descriptions

1. **manifest.json**  
   Contains essential information about the extension, such as the name, version, permissions, and definitions for the working files (`background.js` and `popup.html`).

2. **background.js**  
   Background script that uses the `chrome.webRequest` API to count successful network requests and updates the badge count on the extension icon.

3. **popup.html**  
   HTML file that displays the request count in the extension popup window and includes a button to reset the count.

4. **popup.js**  
   Script to update the displayed request count and reset the count when the user requests it.

5. **Icons**  
   Icons displayed for the extension in the toolbar and other areas in the Chrome interface.

## Installation

1. Clone or download this project.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder with the extension files.

## Usage

- The extension shows the number of successful network requests on the current page.
- You can view the count on the extension icon or by clicking the icon to open the popup.
- To reset the count, click the **Reset Count** button.
