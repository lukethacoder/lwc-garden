import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./props.html";
class Props extends LightningElement {
  constructor(...args) {
    super(...args);
    /**
     * Module metadata (with optional props key)
     * @type {import('../types').GardenModule}
     */
    this.module = void 0;
    /**
     * Key/value of the properties that have been set for the LWC
     * @type {object}
     */
    this.propValues = {};
    this.handleClearValues = () => {
      this.dispatchEvent(new CustomEvent('gardenpropsclear', {
        bubbles: true,
        composed: true
      }));
    };
  }
  get props() {
    if (!(this.module && Object.hasOwn(this.module, 'argTypes'))) {
      return undefined;
    }
    const {
      module,
      propValues
    } = this;
    const withPropValues = module.argTypes.reduce((acc, item) => {
      const {
        name
      } = item;
      acc.push({
        ...item,
        value: Object.hasOwn(propValues, name) ? propValues[name] : null
      });
      return acc;
    }, []);
    return withPropValues;
  }
  /*LWC compiler v6.5.0*/
}
_registerDecorators(Props, {
  publicProps: {
    module: {
      config: 0
    },
    propValues: {
      config: 0
    }
  },
  fields: ["handleClearValues"]
});
export default _registerComponent(Props, {
  tmpl: _tmpl,
  sel: "garden-props",
  apiVersion: 61
});