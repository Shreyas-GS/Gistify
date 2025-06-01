document.getElementById("summarizeBtn").addEventListener("click", () => {
  console.log("Summarize button clicked.");

  const summaryLength = document.getElementById("summaryLength").value; // Get selected length

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "summarize",
      length: summaryLength, // Send length value
    });

    // Listen for the summary response
    chrome.runtime.onMessage.addListener(function listener(message) {
      console.log("Message received in popup.js:", message);

      if (message.type === "summary") {
        document.getElementById("summaryOutput").innerText =
          message.summary || "No summary available.";

        // Remove listener after processing the message
        chrome.runtime.onMessage.removeListener(listener);
      }
    });
  });
});

document.getElementById("adBlockBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length === 0 || !tabs[0].id) {
      console.error("No active tab found.");
      return;
    }

    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "hideAds" },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error(
            "Error sending message to content script:",
            chrome.runtime.lastError.message
          );
        } else {
          console.log("Ad-block message sent successfully.");
        }
      }
    );
  });
});
