# Network Request Tracker Chrome Extension

**Network Request Tracker** is a Chrome extension that monitors and displays the count of both successfully completed and failed network requests for the current tab. The extension updates the count in real-time, allowing users to track network activity on a page, including a success rate percentage.

## Contents

- `manifest.json`
- `background.js`
- `popup.html`
- `popup.css`
- `popup.js`
- Icons (`icon16.png`, `icon48.png`, `icon128.png`)

## File Descriptions

1. **manifest.json**  
   Contains essential information about the extension, including the name, version, permissions, and file definitions (`background.js` and `popup.html`).

2. **background.js**  
   Background script that uses the `chrome.webRequest` API to track both successful and failed network requests. It updates the badge count on the extension icon and sends real-time updates to the popup.

3. **popup.html**  
   HTML file for the popup interface. Displays the count of completed and failed requests, total requests, and success rate.

4. **popup.css**  
   CSS file for styling the popup interface, creating a clean, visually appealing layout with metric cards for each statistic.

5. **popup.js**  
   Script that communicates with the background script to receive real-time updates and display network stats in the popup.

6. **Icons**  
   Icons (`icon16.png`, `icon48.png`, `icon128.png`) used to represent the extension in the Chrome toolbar and other areas.

## Installation

1. Clone or download this project.
   ```bash
   git clone https://github.com/urosptrvc/Aqua-Web-Inspector

## Usage

- The extension tracks both successful and failed network requests on the current page.
- The badge icon displays the total number of network requests in real-time.
- Click the extension icon to view the popup, which shows:
- Completed Requests: Number of successful network requests.
- Failed Requests: Number of failed network requests.
- Total Requests: Total count of network requests.
- Success Rate: Percentage of successful requests out of total requests.
