import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./propInput.html";
import HTML_INPUT_BOOLEAN from './boolean.html';
import HTML_INPUT_CHECKBOX from './checkbox.html';
import HTML_INPUT_COLOR from './color.html';
import HTML_INPUT_TEXT from './text.html';
import HTML_INPUT_NUMBER from './number.html';
import HTML_INPUT_RADIO from './radio.html';
import HTML_INPUT_RANGE from './range.html';
import HTML_INPUT_SELECT from './select.html';

/**
 * @type {{[key in import('../types').GardenArgTypes]: any}}
 */
const INPUT_TYPE_MAP = {
  boolean: HTML_INPUT_BOOLEAN,
  color: HTML_INPUT_COLOR,
  text: HTML_INPUT_TEXT,
  number: HTML_INPUT_NUMBER,
  radio: HTML_INPUT_RADIO,
  'inline-radio': HTML_INPUT_RADIO,
  checkbox: HTML_INPUT_CHECKBOX,
  'inline-checkbox': HTML_INPUT_CHECKBOX,
  range: HTML_INPUT_RANGE,
  select: HTML_INPUT_SELECT
};
const INPUT_TYPE_KEYS = Object.keys(INPUT_TYPE_MAP);
class PropInput extends LightningElement {
  constructor(...args) {
    super(...args);
    /**
     * @type {string}
     */
    this.label = '';
    /**
     * @type {import('../types').GardenArgType['type']}
     */
    this.type = 'text';
    /**
     * @type {import('../types').GardenArgTypes}
     */
    this.name = 'text';
    /**
     * @type {import('../types').GardenOption}
     */
    this.options = [];
    /**
     * when type='(number | range)'
     * @type {number}
     */
    this.min = 0;
    /**
     * when type='(number | range)'
     * @type {number}
     */
    this.max = 10;
    /**
     * when type='(number | range)'
     * @type {number}
     */
    this.step = 1;
    this._value = void 0;
  }
  /**
   * @type {string | number | boolean}
   */
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  get optionsToRender() {
    const values = (this.value || '').split(';').filter(item => item !== undefined && item.length > 0);
    return this.options.map(item => {
      return {
        ...item,
        checked: values.includes(item.value)
      };
    });
  }
  handleOnInput(event) {
    let value = event.target.value;
    if (this.type === 'boolean') {
      value = event.target.checked;
    }
    if (this.type === 'number' || this.type === 'range') {
      value = Number(event.target.value);
    }
    if (this.type === 'checkbox' || this.type === 'inline-checkbox') {
      const checkedValue = event.target.value;
      let valueArray = this.value ? this.value.split(';').filter(item => item !== undefined && item.length > 0) : [];

      // remove the value if it already exists
      if (valueArray.includes(checkedValue)) {
        valueArray = valueArray.filter(item => item !== checkedValue);
      } else {
        // add if it doesn't already exist
        valueArray = [...valueArray, checkedValue];
      }
      value = valueArray.join(';');
    }
    this.dispatchEvent(new CustomEvent('gardenpropschange', {
      detail: {
        key: this.name,
        value
      },
      bubbles: true,
      composed: true
    }));
  }
  render() {
    const {
      type
    } = this;
    if (INPUT_TYPE_KEYS.includes(type)) {
      return INPUT_TYPE_MAP[type];
    }
    return HTML_INPUT_TEXT;
  }
  /*LWC compiler v6.5.0*/
}
_registerDecorators(PropInput, {
  publicProps: {
    value: {
      config: 3
    },
    label: {
      config: 0
    },
    type: {
      config: 0
    },
    name: {
      config: 0
    },
    options: {
      config: 0
    },
    min: {
      config: 0
    },
    max: {
      config: 0
    },
    step: {
      config: 0
    }
  },
  fields: ["_value"]
});
export default _registerComponent(PropInput, {
  tmpl: _tmpl,
  sel: "garden-prop-input",
  apiVersion: 61
});