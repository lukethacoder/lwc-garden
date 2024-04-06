import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./commandPalette.html";
class CommandPalette extends LightningElement {
  constructor(...args) {
    super(...args);
    this.modules = [];
    this.filterValue = '';
    this.filteredModules = [];
    this.handleOnInput = event => {
      this.handleSearchModule(event.target.value);
    };
    this.handleSearchModule = stringValue => {
      this.filterValue = stringValue;
      if (stringValue && this.modules) {
        this.filteredModules = this.modules.filter(item => item.label.toLowerCase().includes(stringValue.toLowerCase()) || item.name.toLowerCase().includes(stringValue.toLowerCase()))
        // max 10 matching items
        .slice(0, 10);
      } else {
        this.filteredModules = [];
      }
    };
    this.handleClickModule = event => {
      // close the dialog
      this.close();
      event.preventDefault();
      window.history.pushState('', '', event.target.href);
      this.dispatchEvent(new CustomEvent('moduleselect', {
        detail: {
          name: event.target.dataset.name
        }
      }));
    };
    this.keyDownHandler = event => {
      const isOpen = this.refs.dialogEl.open;
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        if (isOpen) {
          this.close();
        } else {
          this.showModal();
        }
      } else {
        // if dialog is open, allow focus shifting using ArrowUp/ArrowDown
        if (isOpen) {
          if (this.filteredModules.length > 0 && ['ArrowUp', 'ArrowDown'].includes(event.code)) {
            const elements = this.template.querySelectorAll('a');
            const focusedElement = this.template.querySelector('a:focus');

            // no elements - focus back to the input
            if (!elements) {
              ;
              this.refs.inputEl.focus();
              return;
            }
            if (!focusedElement) {
              elements[0].focus();
              return;
            }
            const focusedElementIndex = Array.from(elements).findIndex(item => item === focusedElement);
            if (event.code === 'ArrowDown') {
              if (focusedElementIndex === elements.length - 1) {
                return;
              }
              elements[focusedElementIndex + 1].focus();
            } else if (event.code === 'ArrowUp') {
              if (focusedElementIndex === 0) {
                return;
              }
              elements[focusedElementIndex - 1].focus();
            }
          } else if (event.code === 'Enter') {
            // reset the filter value - user has selected an LWC
            this.filterValue = '';
          } else {
            // if typing chars, focus back to the inputEl
            if (!this.template.querySelector('input:focus')) {
              ;
              this.refs.inputEl.focus();
            }
          }
        }
      }
    };
  }
  showModal() {
    ;
    this.refs.dialogEl.showModal();
  }
  show() {
    ;
    this.refs.dialogEl.show();
  }
  close() {
    ;
    this.refs.dialogEl.close();
  }
  connectedCallback() {
    window.addEventListener('keydown', this.keyDownHandler);
  }
  /*LWC compiler v6.5.0*/
}
_registerDecorators(CommandPalette, {
  publicProps: {
    modules: {
      config: 0
    }
  },
  publicMethods: ["showModal", "show", "close"],
  fields: ["filterValue", "filteredModules", "handleOnInput", "handleSearchModule", "handleClickModule", "keyDownHandler"]
});
export default _registerComponent(CommandPalette, {
  tmpl: _tmpl,
  sel: "garden-command-palette",
  apiVersion: 61
});