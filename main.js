chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    'use strict';
    if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
            message: 'url_updated',
            url: changeInfo.url
        });
        chrome.storage.sync.get(['message'], items => {
            chrome.tabs.sendMessage(tabId, {
                message: 'whatsappMessage',
                whatsappMessage: items.message
            });
        });
    }
});
