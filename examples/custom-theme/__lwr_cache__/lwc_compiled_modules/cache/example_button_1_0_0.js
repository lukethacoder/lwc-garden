import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./button.html";
class Button extends LightningElement {
  constructor(...args) {
    super(...args);
    /**
     * Label for the button
     * @type {string}
     */
    this.label = 'Button Label';
    /**
     * Background color
     * @type {string}
     */
    this.color = '#fff';
    /**
     * Background color
     * @type {string}
     */
    this.backgroundColor = 'burlywood';
    /**
     * Background color
     * @type {string}
     */
    this.borderRadius = '0px';
  }
  get computedStyle() {
    return `
      color: ${this.color || '#fff'};
      background-color: ${this.backgroundColor || 'burlywood'};
      border-radius: ${this.borderRadius || '0px'};
    `;
  }
  /*LWC compiler v6.5.0*/
}
_registerDecorators(Button, {
  publicProps: {
    label: {
      config: 0
    },
    color: {
      config: 0
    },
    backgroundColor: {
      config: 0
    },
    borderRadius: {
      config: 0
    }
  }
});
export default _registerComponent(Button, {
  tmpl: _tmpl,
  sel: "example-button",
  apiVersion: 61
});