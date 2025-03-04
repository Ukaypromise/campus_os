import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["source", "tooltip", "copied"]

  connect() {
    this.sourceTarget.addEventListener("mouseenter", this.showTooltip.bind(this))
    this.sourceTarget.addEventListener("mouseleave", this.hideTooltip.bind(this))
  }

  disconnect() {
    this.sourceTarget.removeEventListener("mouseenter", this.showTooltip.bind(this))
    this.sourceTarget.removeEventListener("mouseleave", this.hideTooltip.bind(this))
  }

  copy() {
    const email = this.element.getAttribute("data-clipboard-email")
    navigator.clipboard.writeText(email)
      .then(() => {
        this.showCopied()
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  showTooltip() {
    this.tooltipTarget.classList.remove("hidden")
  }

  hideTooltip() {
    this.tooltipTarget.classList.add("hidden")
  }

  showCopied() {
    this.tooltipTarget.classList.add("hidden")
    this.copiedTarget.classList.remove("hidden")
    setTimeout(() => {
      this.copiedTarget.classList.add("hidden")
    }, 2000)
  }
}