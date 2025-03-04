import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["placeholder", "firstName", "lastName"]
  static values = { hasColor: Boolean }

  connect() {
    this.defaultContent = this.placeholderTarget.innerHTML
    this.currentInitials = ""
    
    if (this.hasFirstNameTarget && this.hasLastNameTarget) {
      this.updateInitials()
    }
  }

  updateInitials() {
    if (!this.hasFirstNameTarget || !this.hasLastNameTarget) return
    
    // Don't update if avatar is present (placeholder is hidden)
    if (this.placeholderTarget.classList.contains('hidden')) return

    const firstName = this.firstNameTarget.value || ""
    const lastName = this.lastNameTarget.value || ""
    
    if (firstName || lastName) {
      const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
      if (initials.trim() !== "") {
        // Only change color if initials actually changed
        if (initials !== this.currentInitials) {
          this.currentInitials = initials
          this.setRandomColor()
        }
        this.placeholderTarget.innerHTML = initials
      } else {
        this.setDefaultIcon()
      }
    } else {
      this.setDefaultIcon()
    }
  }

  setDefaultIcon() {
    // Don't update if avatar is present
    if (this.placeholderTarget.classList.contains('hidden')) return
    
    this.placeholderTarget.innerHTML = this.defaultContent
    this.placeholderTarget.className = "flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold"
    this.currentInitials = ""
  }

  setRandomColor() {
    const colors = [
      { bg: "bg-blue-100", text: "text-blue-800" },
      { bg: "bg-green-100", text: "text-green-800" },
      { bg: "bg-purple-100", text: "text-purple-800" },
      { bg: "bg-red-100", text: "text-red-800" },
      { bg: "bg-yellow-100", text: "text-yellow-800" },
      { bg: "bg-pink-100", text: "text-pink-800" },
      { bg: "bg-indigo-100", text: "text-indigo-800" }
    ]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    this.placeholderTarget.className = [
      "flex", "items-center", "justify-center",
      "w-12", "h-12", "rounded-full",
      "text-sm", "font-medium",
      randomColor.bg, randomColor.text
    ].join(" ")
  }
} 