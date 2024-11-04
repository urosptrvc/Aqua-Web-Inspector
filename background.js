let completedRequests = 0;
let failedRequests = 0;
let currentTabId = null;
let popupPort = null;

// Increment completed or failed requests
chrome.webRequest.onCompleted.addListener(
  () => {
    completedRequests++;
    updateBadgeAndPopup();
  },
  { urls: ["<all_urls>"] }
);

chrome.webRequest.onErrorOccurred.addListener(
  () => {
    failedRequests++;
    updateBadgeAndPopup();
  },
  { urls: ["<all_urls>"] }
);

// Function to calculate success percentage and send updates to popup
function updateBadgeAndPopup() {
  const totalRequests = completedRequests + failedRequests;
  const successPercentage = totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0;

  // Update badge text with the total request count
  chrome.action.setBadgeText({ text: totalRequests.toString() });

  // Send updated data to popup if connected
  if (popupPort) {
    popupPort.postMessage({
      completed: completedRequests,
      failed: failedRequests,
      total: totalRequests,
      successPercentage: successPercentage.toFixed(2)
    });
  }
}

// Reset counts when a new URL is loaded in the current tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.url) {
    completedRequests = 0;
    failedRequests = 0;
    chrome.action.setBadgeText({ text: '' });
  }
});

// Track the active tab to know when to reset
chrome.tabs.onActivated.addListener((activeInfo) => {
  currentTabId = activeInfo.tabId;
  completedRequests = 0;
  failedRequests = 0;
  chrome.action.setBadgeText({ text: '' });
});

// Listen for popup connection
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    popupPort = port;

    // Send initial data when popup connects
    updateBadgeAndPopup();

    // Handle popup disconnect
    popupPort.onDisconnect.addListener(() => {
      popupPort = null;
    });
  }
});
