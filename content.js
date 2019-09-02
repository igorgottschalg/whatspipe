"use strict";
let pipe, whats, pipeDeal;
pipe = new pipeDriveWhatsappExtension();
pipeDeal = new pipeDriveWhatsappExtensionDeal();

const checkUrl = url => {
  pipe.destroy();
  pipeDeal.destroy();
  if (url.indexOf("persons") > 0) {
    pipe.init();
  } else if (url.indexOf("deal") > 0) {
    pipeDeal.init();
  }
};
checkUrl(window.location.href);

chrome.runtime.onMessage.addListener(request => {
  if (request.message === "url_updated") checkUrl(request.url);
  if (request.message === "whatsappMessage") {
    pipeDeal.changeMessage(request.whatsappMessage);
    pipe.changeMessage(request.whatsappMessage);
  }
});
