"use strict";
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url.indexOf("deal") > 0)
    chrome.tabs.update(tabId, { url: tab.url });

  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: "url_updated",
      url: changeInfo.url
    });
  }
});
