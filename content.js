'use strict';
let pipe = new pipeDriveWhatsappExtension();
let pipeDeal = new pipeDriveWhatsappExtensionDeal();
const checkUrl = () => {
    pipe.destroy();
    pipeDeal.destroy();
    if (window.location.href.indexOf('persons') > 0) {
        pipe.init();
    } else if (window.location.href.indexOf('deal') > 0) {
        pipeDeal.init();
    }
};
checkUrl();

chrome.runtime.onMessage.addListener(request => {
    if (request.message === 'url_updated') checkUrl();
    if (request.message === 'whatsappMessage') {
        pipeDeal.changeMessage(request.whatsappMessage);
        pipe.changeMessage(request.whatsappMessage);
    }
});
