import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input", "image", "placeholder"];

  connect() {
    this.updatePreview();
  }

  updatePreview() {
    const fileInput = this.inputTarget;
    const previewImage = this.imageTarget;
    const placeholder = this.placeholderTarget;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.classList.remove("hidden");
        placeholder.classList.add("hidden");
      };

      reader.readAsDataURL(fileInput.files[0]);
    } else {
      previewImage.classList.add("hidden");
      placeholder.classList.remove("hidden");
    }
  }

  change() {
    this.updatePreview();
  }
}
