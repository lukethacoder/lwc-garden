import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./allArgTypes.html";
class Props extends LightningElement {
  constructor(...args) {
    super(...args);
    this.text = void 0;
    this.color = void 0;
    this.boolean = void 0;
    this.number = void 0;
    this.select = void 0;
    this.radio = void 0;
    this.inlineRadio = void 0;
    this.checkbox = void 0;
    this.inlineCheckbox = void 0;
    this.range = void 0;
  }
  get inlineStyle() {
    return `border-color: ${this.color || 'black'};`;
  }
  get displayProperties() {
    return JSON.stringify({
      text: this.text,
      color: this.color,
      boolean: this.boolean,
      number: this.number,
      select: this.select,
      radio: this.radio,
      inlineRadio: this.inlineRadio,
      checkbox: this.checkbox,
      inlineCheckbox: this.inlineCheckbox,
      range: this.range
    }, undefined, 2);
  }
  /*LWC compiler v6.5.0*/
}
_registerDecorators(Props, {
  publicProps: {
    text: {
      config: 0
    },
    color: {
      config: 0
    },
    boolean: {
      config: 0
    },
    number: {
      config: 0
    },
    select: {
      config: 0
    },
    radio: {
      config: 0
    },
    inlineRadio: {
      config: 0
    },
    checkbox: {
      config: 0
    },
    inlineCheckbox: {
      config: 0
    },
    range: {
      config: 0
    }
  }
});
export default _registerComponent(Props, {
  tmpl: _tmpl,
  sel: "example-all-arg-types",
  apiVersion: 61
});