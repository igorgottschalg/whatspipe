"use strict";

class whatsappExtension {
  constructor() {
    this.whatsappButtonElement = null;
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.createButton();
      }, 2000);
    });
  }

  copyRawText() {
    if (!document.querySelectorAll("#main header [role='button']").length) {
      return false;
    }

    let { innerText: user } = document.querySelectorAll(
      "#main header [role='button']"
    )[1];
    let clipboard = [];

    document.querySelectorAll(".copyable-area").forEach(area => {
      if (area.nodeName === "DIV" && area.children) {
        Array.from(area.children).forEach(children => {
          if (children.children.length) {
            Array.from(children.children).forEach(section => {
              if (section.children.length) {
                Array.from(section.children).forEach(message => {
                  if (message.innerText) {
                    let temp = message.innerText.split("\n");
                    if (temp.length > 1) {
                      temp.pop();
                      if (message.querySelector(".message-out")) {
                        clipboard.push(`\nEU\n${temp.join("\n")}`);
                      } else {
                        clipboard.push(`\n${user}\n${temp.join("\n")}`);
                      }
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
    this.copyToClipboard(clipboard.join("\n"));
    clipboard = undefined;
  }

  copyToClipboard(text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  createButton() {
    let whatsappButton = document.createElement("div");
    whatsappButton.id = "whatsappCopyChat";
    whatsappButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#fff" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`;
    whatsappButton.classList.add("whatsappCopyChat");
    document.body.prepend(whatsappButton);
    this.whatsappButtonElement = document.querySelector("#whatsappCopyChat");
    this.whatsappButtonElement.addEventListener("click", () => {
      this.copyRawText();
    });
  }
}
if (window.location.href.indexOf("web.whatsapp") > 0) {
  const whats = new whatsappExtension();
}
