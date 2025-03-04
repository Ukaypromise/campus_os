import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["form"];

  connect() {
    this.updateTurboFrame();
    window.addEventListener("resize", this.updateTurboFrame.bind(this));
  }

  disconnect() {
    window.removeEventListener("resize", this.updateTurboFrame.bind(this));
  }

  updateTurboFrame() {
    const isSmallScreen = window.innerWidth < 640;
    const frame = isSmallScreen ? "_card" : "_table";
    this.formTarget.setAttribute("data-turbo-frame", frame);
  }

  submit(event) {
    this.element.requestSubmit();
  }
}
