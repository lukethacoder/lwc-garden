import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement, createElement } from "lwc";
import _tmpl from "./container.html";
import { traverseActiveTreeRecursively } from 'garden/utils';
import HTML_TEMPLATE from './container.html';
class Container extends LightningElement {
  constructor(...args) {
    super(...args);
    /**
     * Custom Container HTML template
     * Optional, allows for end users to override the base container component
     */
    this.htmlTemplate = void 0;
  }
  /**
   * Currently active module metadata
   * @type {GardenModule | undefined}
   */
  get module() {
    return this._module;
  }
  set module(value) {
    this._module = value;
  }
  async handleSetSlots() {
    // only run if the components has slots
    if (this.module) {
      if (Object.hasOwn(this.module, 'slots')) {
        // TODO: should this happen on renderedCallback? convert module to a getter?
        const slotElements = Array.from(this.template.querySelectorAll('slot'));
        const child = slotElements[0];

        // find child slots
        const slots = [];
        traverseActiveTreeRecursively(child, payload => {
          if (payload.tagName === 'SLOT') {
            slots.push(payload);
          }
        });

        // get slotComponents from config
        const slotComponents = this.module.slotComponents;
        const slotComponentKeys = slotComponents ? Object.keys(slotComponents) : undefined;
        for (const slot of slots) {
          if (!slot?.parentElement?.classList.contains('container')) {
            const slotName = slot.name || 'default';
            if (slotComponents && slotComponentKeys && slotComponentKeys.includes(slotName)) {
              // dynamically import the slot component to render
              const slotEl = await slotComponents[slotName]();
              const element = createElement('garden-placeholder', {
                is: slotEl.default
              });
              slot.appendChild(element);
            } else {
              // TODO: import a garden/placeholder component instead
              const pEl = document.createElement('p');
              pEl.textContent = 'placeholder';
              slot.appendChild(pEl);
            }
          }
        }
      }
    }
  }
  handleSlotChange(event) {
    const slot = event.target;
    const children = slot.assignedElements() || [];
    if (children.length > 0) {
      const currentModule = children[0];
      if (this._currentModuleName !== currentModule.tagName) {
        this._currentModuleName = currentModule.tagName;
        this.handleSetSlots();
      }
    }
    // TODO: fire off event for parent and/or plugins to listen for?
  }
  render() {
    if (this.htmlTemplate) {
      return this.htmlTemplate;
    }
    return HTML_TEMPLATE;
  }
  /*LWC compiler v6.5.0*/
}
_registerDecorators(Container, {
  publicProps: {
    htmlTemplate: {
      config: 0
    },
    module: {
      config: 3
    }
  }
});
export default _registerComponent(Container, {
  tmpl: _tmpl,
  sel: "garden-container",
  apiVersion: 61
});