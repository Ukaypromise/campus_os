import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "addButton", "removeButton"]

  connect() {
    this.showAddButton()
  }

  toggle() {
    this.formTarget.classList.toggle("hidden")
  
    if (this.formTarget.classList.contains("hidden")) {
      this.clearFields()
      this.showAddButton()
    } else {
      this.showRemoveButton()
    }
  }
  
  clearFields() {
    this.formTarget.querySelectorAll("input, textarea").forEach(field => {
      field.value = ""
    })
  }

  showAddButton() {
    this.addButtonTarget.classList.remove("hidden")
    this.removeButtonTarget.classList.add("hidden")
  }

  showRemoveButton() {
    this.removeButtonTarget.classList.remove("hidden")
    this.addButtonTarget.classList.add("hidden")
  }
}
