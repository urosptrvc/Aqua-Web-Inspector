document.addEventListener("DOMContentLoaded", () => {
  const port = chrome.runtime.connect({ name: "popup" });

  // Listen for messages from the background script
  port.onMessage.addListener((message) => {
    if (message) {
      document.getElementById("completed").textContent = `Completed: ${message.completed}`;
      document.getElementById("failed").textContent = `Failed: ${message.failed}`;
      document.getElementById("total").textContent = `Total Requests: ${message.total}`;
      document.getElementById("percentage").textContent = `Success Rate: ${message.successPercentage}%`;
    }
  });
});
