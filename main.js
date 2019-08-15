"use strict";
let pipe, whats;

if (window.location.host.indexOf("pipedrive.com")) {
  pipe = new pipeDriveWhatsappExtension();
}

if (window.location.host.indexOf("whatsapp.com")) {
  whats = new whatsappExtension();
}
