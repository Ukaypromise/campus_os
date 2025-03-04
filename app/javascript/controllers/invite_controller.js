import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["checkbox", "inviteButton", "modal", "itemCount", "resendHiddenInput", "deleteHiddenInput"];

  connect() {
    this.updateInviteButton();
  }

  toggleAll(event) {
    const isChecked = event.target.checked;
    this.checkboxTargets.forEach((checkbox) => {
      checkbox.checked = isChecked;
      this.toggleRowHighlight(checkbox);
    });
    this.updateInviteButton();
    this.updateHiddenInputs();
  }
  
  toggleCheckbox(event) {
    this.toggleRowHighlight(event.target);
    this.updateInviteButton();
    this.updateHiddenInputs();
  }
  
  toggleRowHighlight(checkbox) {
    const row = checkbox.closest("tr");
    if (row) {
      row.classList.toggle("bg-slate-50", checkbox.checked);
    }
  }

  updateInviteButton() {
    const selectedCount = this.checkboxTargets.filter((checkbox) => checkbox.checked).length;
    const anyChecked = selectedCount > 0;

    if (this.hasItemCountTarget) {
      this.itemCountTarget.textContent = selectedCount;
    }

    if (this.hasInviteButtonTarget) {
      this.inviteButtonTarget.disabled = !anyChecked;
    }

    this.modalTarget.classList.toggle("hidden", !anyChecked);
  }

  deselectAll() {
    this.checkboxTargets.forEach((checkbox) => {
      checkbox.checked = false;
    });
    this.updateInviteButton();
    this.updateHiddenInputs();
  }

  updateHiddenInputs() {
    this.updateHiddenInput(this.resendHiddenInputTarget);
    this.updateHiddenInput(this.deleteHiddenInputTarget);
  }

  updateHiddenInput(target) {
    target.parentNode.querySelectorAll('input[name="selected_employees[]"]').forEach(input => input.remove());

    const selectedIds = this.checkboxTargets
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    selectedIds.forEach((id) => {
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = "selected_employees[]"; 
      hiddenInput.value = id;
      target.appendChild(hiddenInput);
    });
  }
}