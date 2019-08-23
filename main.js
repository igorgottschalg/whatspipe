"use strict";
let pipe, whats;

if (window.location.host.indexOf("pipedrive.com") > 0) {
  pipe = new pipeDriveWhatsappExtension();

  let oldHref = document.location.href;
  let bodyList = document.querySelector("body"),
    observer = new MutationObserver(mutations => {
      mutations.forEach(() => {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          if (
            window.location.href.indexOf("persons") > 0 ||
            window.location.href.indexOf("deal") > 0
          ) {
            pipe.init();
          } else {
            if (document.querySelector(".whatsappPipeline"))
              document.querySelector(".whatsappPipeline").remove();
          }
        }
      });
    });

  const config = {
    childList: true,
    subtree: true
  };
  observer.observe(bodyList, config);
}

if (window.location.host.indexOf("whatsapp.com") > 0) {
  whats = new whatsappExtension();
}
