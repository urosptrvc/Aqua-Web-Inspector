document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.storage.local.get([tabId.toString()], (result) => {
        const successful = result[tabId]?.successful || 0;
        const failed = result[tabId]?.failed || 0;
        const total = successful + failed;
        const successRate = total > 0 ? ((successful / total) * 100).toFixed(2) : 0;
  
        document.getElementById("request-count").textContent = successful;
        document.getElementById("success-rate").textContent = `${successRate}%`;
      });
    });
  
    document.getElementById("reset").addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        // Reset counts in storage
        chrome.storage.local.set({ [tabId]: { successful: 0, failed: 0 } });
        document.getElementById("request-count").textContent = "0";
        document.getElementById("success-rate").textContent = "0%";
        chrome.action.setBadgeText({ text: "0", tabId });
      });
    });
  });
  