import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu"]
  static values = {
    closeOnClickOutside: { type: Boolean, default: true }
  }

  connect() {
    if (this.closeOnClickOutsideValue) {
      this.addClickOutsideListener()
    }
  }

  disconnect() {
    if (this.closeOnClickOutsideValue) {
      this.removeClickOutsideListener()
    }
  }

  toggle() {
    this.menuTarget.classList.toggle("hidden")
  }

  hide() {
    this.menuTarget.classList.add("hidden")
  }

  show() {
    this.menuTarget.classList.remove("hidden")
  }

  addClickOutsideListener() {
    this.clickOutsideHandler = (event) => {
      if (!this.element.contains(event.target)) {
        this.hide()
      }
    }
    document.addEventListener("click", this.clickOutsideHandler)
  }

  removeClickOutsideListener() {
    document.removeEventListener("click", this.clickOutsideHandler)
  }
}