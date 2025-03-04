import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "progressBar", "progressBarContainer", "progressText", "statusMessage", "submitButton"]

  upload(event) {
    event.preventDefault();

    const form = event.target;
    const file = this.inputTarget.files[0];

    if (!file) return;

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", form.action, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    this.progressBarContainerTarget.classList.remove("hidden");
    this.statusMessageTarget.classList.add("hidden"); // Hide status initially
    this.progressTextTarget.textContent = "0%";

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        this.updateProgress(percent);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.updateProgress(100);
        this.showStatusMessage("Upload Complete!", "text-green-600");
        this.submitButtonTarget.disabled = false;
      } else {
        this.updateProgress(0);
        this.showStatusMessage("Upload Failed!", "text-red-600");
      }
    });

    xhr.send(formData);
  }

  updateProgress(percent) {
    const circle = this.progressBarTarget;
    const circumference = 264; // 2 * π * r (r=42)
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    this.progressTextTarget.textContent = `${percent}%`;
  }

  showStatusMessage(message, colorClass) {
    this.statusMessageTarget.textContent = message;
    this.statusMessageTarget.className = `mt-2 text-sm font-medium ${colorClass}`;
    this.statusMessageTarget.classList.remove("hidden");
  }
}
