import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu"]

  toggle() {
    this.menuTarget.classList.toggle("-translate-x-full")
  }

  hide(event) {
    if (event.target === this.menuTarget) {
      this.menuTarget.classList.add("-translate-x-full")
    }
  }
} 