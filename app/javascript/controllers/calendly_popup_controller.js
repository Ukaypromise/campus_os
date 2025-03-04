import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="calendly-popup"
export default class extends Controller {
  static values = { url: String };

  connect() {
    console.log("Calendly controller connected");
  }

  showPopup(event) {
    event.preventDefault();
    Calendly.showPopupWidget(this.urlValue);
    return false;
  }
}
