chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  "use strict";
  if (changeInfo.url) {
    if (changeInfo.url.indexOf("deal") > 0) {
      chrome.tabs.update(tabId, { url: tab.url });
    }

    chrome.tabs.sendMessage(tabId, {
      message: "url_updated",
      url: changeInfo.url
    });

    getMessage();
  }
});

const getMessage = () => {
  chrome.storage.sync.get("message", items => {
    chrome.tabs.sendMessage(tabId, {
      message: "whatsappMessage",
      whatsappMessage: items.message
    });
  });
};
