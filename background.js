let requestCounts = {}; // Tracks successful requests per tab
let failedCounts = {};  // Tracks failed requests per tab

// Track successful requests
chrome.webRequest.onCompleted.addListener(
  (details) => {
    const tabId = details.tabId;
    if (tabId !== -1) {
      if (!requestCounts[tabId]) requestCounts[tabId] = 0;
      requestCounts[tabId]++;
      saveCounts(tabId); // Save counts to storage
      updateBadge(tabId);
    }
  },
  { urls: ["<all_urls>"] }
);

// Track failed requests
chrome.webRequest.onErrorOccurred.addListener(
  (details) => {
    const tabId = details.tabId;
    if (tabId !== -1) {
      if (!failedCounts[tabId]) failedCounts[tabId] = 0;
      failedCounts[tabId]++;
      saveCounts(tabId); // Save counts to storage
      updateBadge(tabId);
    }
  },
  { urls: ["<all_urls>"] }
);

// Save counts to storage
function saveCounts(tabId) {
  chrome.storage.local.set({
    [tabId]: {
      successful: requestCounts[tabId] || 0,
      failed: failedCounts[tabId] || 0
    }
  });
}

// Update badge text based on successful requests
function updateBadge(tabId) {
  const total = (requestCounts[tabId] || 0) + (failedCounts[tabId] || 0);
  chrome.action.setBadgeText({ text: total.toString(), tabId });
}

// Reset counts on page navigation
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0) {
    requestCounts[details.tabId] = 0;
    failedCounts[details.tabId] = 0;
    chrome.storage.local.set({ [details.tabId]: { successful: 0, failed: 0 } });
    chrome.action.setBadgeText({ text: "0", tabId: details.tabId });
  }
});
