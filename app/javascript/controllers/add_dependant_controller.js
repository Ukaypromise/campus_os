import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["dependantsContainer", "template", "tabsContainer", "form"];
  static values = { activeTab: String };

  connect() {
    // Only initialize tabs if none exist
    const existingTabs = this.tabsContainerTarget.querySelectorAll('.tab-item');
    if (existingTabs.length === 0) {
      const firstForm = this.formTargets[0];
      if (firstForm) {
        this.addTab(this.getFormName(firstForm), firstForm.id);
        this.switchTab(firstForm.id);
      }
    } else {
      // If tabs exist, just activate the first one
      const firstTab = existingTabs[0];
      if (firstTab) {
        this.switchTab(firstTab.dataset.formId);
      }
    }
    
    this.setupValidationErrorHandling();
    this.updateDeleteButtonsVisibility();
    this.updateTabsVisibility();
  }

  add(event) {
    event.preventDefault();
    const template = this.templateTarget.content.cloneNode(true);
    const newFormId = `dependant-new-${this.formTargets.length}`;
    template.querySelector('.dependant-form').id = newFormId;
    
    // Update the indices for the new form
    const currentFormsCount = this.formTargets.length;
    template.querySelectorAll('input, select').forEach(input => {
      const name = input.getAttribute('name');
      if (name) {
        input.setAttribute('name', name.replace('[]', `[${currentFormsCount}]`));
      }
    });
    
    this.dependantsContainerTarget.appendChild(template);
    this.updateAllTabs();
    this.addTab("New Dependant", newFormId);
    this.switchTab(newFormId);
    this.updateDeleteButtonsVisibility();
    this.updateTabsContainerVisibility();
  }

  getFormName(form) {
    const firstName = form.querySelector('[name*="[first_name]"]').value;
    const lastName = form.querySelector('[name*="[last_name]"]').value;
    return firstName || lastName ? `${firstName} ${lastName}`.trim() : 'New Dependant';
  }

  updateAllTabs() {
    this.formTargets.forEach(form => {
      const tab = this.tabsContainerTarget.querySelector(`[data-form-id="${form.id}"]`);
      if (tab) {
        const name = this.getFormName(form);
        tab.querySelector('.tab-name').textContent = name;
      }
    });
  }

  addTab(name, formId) {
    if (!this.tabsContainerTarget.querySelector('.tabs-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'tabs-wrapper bg-gray-100 rounded-lg p-1 inline-flex space-x-1';
      this.tabsContainerTarget.appendChild(wrapper);
    }

    const wrapper = this.tabsContainerTarget.querySelector('.tabs-wrapper');
    const tab = document.createElement('div');
    tab.className = 'tab-item cursor-pointer px-3 py-1 rounded-md text-sm font-medium';
    tab.dataset.formId = formId;
    tab.innerHTML = `
      <span class="tab-name">${name}</span>
      <span class="error-indicator hidden text-red-500">*</span>
    `;
    tab.dataset.action = 'click->add-dependant#handleTabClick';
    wrapper.appendChild(tab);
  }

  handleTabClick(event) {
    const formId = event.currentTarget.dataset.formId;
    this.switchTab(formId);
  }

  switchTab(formId) {
    this.activeTabValue = formId;
    this.updateTabsVisibility();
  }

  updateTabsVisibility() {
    this.formTargets.forEach(form => {
      form.classList.toggle('hidden', form.id !== this.activeTabValue);
    });

    this.tabsContainerTarget.querySelectorAll('.tab-item').forEach(tab => {
      const isActive = tab.dataset.formId === this.activeTabValue;
      tab.classList.toggle('bg-purple-500', isActive);
      tab.classList.toggle('text-white', isActive);
      tab.classList.toggle('text-gray-500', !isActive);
    });

    this.updateTabsContainerVisibility();
  }

  updateTabsContainerVisibility() {
    const totalForms = this.formTargets.length;
    this.tabsContainerTarget.classList.toggle('hidden', totalForms <= 1);
  }

  updateTabName(event) {
    const form = event.target.closest('.dependant-form');
    const name = this.getFormName(form);
    
    const tab = this.tabsContainerTarget.querySelector(`[data-form-id="${form.id}"]`);
    if (tab) {
      tab.querySelector('.tab-name').textContent = name;
      // Update delete button text
      const deleteButton = form.querySelector('[data-action*="removeDependant"]');
      if (deleteButton) {
        deleteButton.textContent = `Delete ${name}`;
      }
    }
  }

  updateDeleteButtonsVisibility() {
    const totalForms = this.formTargets.length;
    this.formTargets.forEach(form => {
      const deleteButton = form.querySelector('[data-action*="removeDependant"]');
      if (deleteButton) {
        const buttonContainer = deleteButton.closest('div');
        buttonContainer.classList.toggle('hidden', totalForms <= 1);
        
        // Update button text if visible
        if (totalForms > 1) {
          const name = this.getFormName(form);
          deleteButton.textContent = `Delete ${name}`;
        }
      }
    });
  }

  setupValidationErrorHandling() {
    this.element.addEventListener('turbo:submit-end', (event) => {
      const response = event.detail.fetchResponse;
      if (response.response.status === 422) {
        this.handleValidationErrors(JSON.parse(response.response.body));
      }
    });
  }

  handleValidationErrors(errors) {
    this.formTargets.forEach(form => {
      const hasErrors = Object.keys(errors).some(field => {
        const input = form.querySelector(`[name*="[${field}]"]`);
        return input && errors[field].length > 0;
      });

      const tab = this.tabsContainerTarget.querySelector(`[data-form-id="${form.id}"]`);
      if (tab) {
        tab.querySelector('.error-indicator').classList.toggle('hidden', !hasErrors);
      }

      if (hasErrors && !this.activeTabValue) {
        this.switchTab(form.id);
      }
    });
  }

  removeDependant(event) {
    const form = event.target.closest('.dependant-form');
    const dependantId = form.dataset.dependantId;
    
    if (dependantId) {
      // Add hidden field for _destroy instead of making API call
      const destroyField = document.createElement('input');
      destroyField.type = 'hidden';
      destroyField.name = `dependants[${this.formTargets.indexOf(form)}][_destroy]`;
      destroyField.value = '1';
      form.appendChild(destroyField);
    }
    
    const tab = this.tabsContainerTarget.querySelector(`[data-form-id="${form.id}"]`);
    if (tab) tab.remove();
    form.remove();

    if (this.activeTabValue === form.id) {
      const firstForm = this.formTargets[0];
      if (firstForm) {
        this.switchTab(firstForm.id);
      }
    }

    this.updateDeleteButtonsVisibility();
    this.updateTabsContainerVisibility();
  }
}
