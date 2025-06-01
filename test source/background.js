chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background.js:", message);
  if (message.type === "summary") {
    console.log("Summary generated:", message.summary);
  } else {
    console.warn("Unexpected message type:", message);
  }
});
chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [
    {
      id: 41,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: '||adspirit.de^',
        resourceTypes: ['script', 'image', 'stylesheet', 'object', 'xmlhttprequest']
      }
    },
    {
      id: 42,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: '||adtech.de^',
        resourceTypes: ['script', 'image', 'stylesheet', 'object', 'xmlhttprequest']
      }
    },
    {
      id: 43,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: '||adtechus.com^',
        resourceTypes: ['script', 'image', 'stylesheet', 'object', 'xmlhttprequest']
      }
    },
    {
      id: 44,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: '||advertising.com^',
        resourceTypes: ['script', 'image', 'stylesheet', 'object', 'xmlhttprequest']
      }
    },
    {
      id: 45,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: '||adzerk.net^',
        resourceTypes: ['script', 'image', 'stylesheet', 'object', 'xmlhttprequest']
      }
    }
  ],
  removeRuleIds: [41, 42, 43, 44, 45] // Remove existing rules if any
});