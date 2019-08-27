"use strict";
let pipe, whats, pipeDeal;
pipe = new pipeDriveWhatsappExtension();
pipeDeal = new pipeDriveWhatsappExtensionDeal();

const checkUrl = () => {
  console.log("Checking URL");
  pipe.destroy();
  pipeDeal.destroy();
  if (window.location.href.indexOf("persons") > 0) {
    pipe.init();
  } else if (window.location.href.indexOf("deal")) {
    pipeDeal.init();
  }
};
checkUrl();

chrome.runtime.onMessage.addListener(request => {
  if (request.message === "url_updated") checkUrl();
});
