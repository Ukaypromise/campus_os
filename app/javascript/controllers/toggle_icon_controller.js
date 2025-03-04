import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["upIcon", "downIcon", "cardContent"];

  connect() {
    this.updateIconAndContentState();
  }

  toggle() {
    if (this.cardContentTarget.classList.contains("hidden")) {
      this.showCardContent();
      this.showUpIcon();
    } else {
      this.hideCardContent();
      this.showDownIcon();
    }
  }

  showUpIcon() {
    this.upIconTarget.classList.remove("hidden");
    this.downIconTarget.classList.add("hidden");
  }

  showDownIcon() {
    this.downIconTarget.classList.remove("hidden");
    this.upIconTarget.classList.add("hidden");
  }

  showCardContent() {
    this.cardContentTarget.classList.remove("hidden");
  }

  hideCardContent() {
    this.cardContentTarget.classList.add("hidden");
  }

  updateIconAndContentState() {
    if (this.cardContentTarget.classList.contains("hidden")) {
      this.showDownIcon(); 
    } else {
      this.showUpIcon(); 
    }
  }
}
