// Listener for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    try {
      console.log(`Processing URL: ${changeInfo.url}`);
      const supportedDomains = ["amazon.com", "amazon.in"];
      const url = new URL(changeInfo.url);

      if (!url.protocol.startsWith("http")) {
        console.log("Skipping unsupported protocol:", url.protocol);
        return;
      }

      const isSupported = supportedDomains.some((domain) =>
        url.hostname.includes(domain)
      );

      if (!isSupported) {
        console.log("Unsupported URL detected:", changeInfo.url);

        // Verify if the tab is still valid before executing the script
        chrome.tabs.get(tabId, (tab) => {
          if (chrome.runtime.lastError || !tab) {
            console.error(
              "Tab no longer exists or is invalid:",
              chrome.runtime.lastError?.message
            );
            return;
          }
          chrome.scripting.executeScript(
            {
              target: { tabId, frameIds: [0] },
              func: () => {
                alert(
                  "This URL is not supported by the Amazon Origin Checker extension."
                );
              },
            },
            (result) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Script injection error:",
                  chrome.runtime.lastError.message
                );
              } else {
                console.log("Alert script executed successfully.");
              }
            }
          );
        });
      }
    } catch (error) {
      console.error("Error processing URL:", error);
    }
  }
});
