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
    whatsappButton.innerHTML = "Copy Chat";
    whatsappButton.classList.add("whatsappCopyChat");
    document.body.prepend(whatsappButton);
    this.whatsappButtonElement = document.querySelector("#whatsappCopyChat");
    this.whatsappButtonElement.addEventListener("click", () => {
      this.copyRawText();
    });
  }
}
