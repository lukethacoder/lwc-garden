import { LightningElement, api } from 'lwc'

import HTML_INPUT_BOOLEAN from './boolean.html'
import HTML_INPUT_CHECKBOX from './checkbox.html'
import HTML_INPUT_COLOR from './color.html'
import HTML_INPUT_TEXT from './text.html'
import HTML_INPUT_NUMBER from './number.html'
import HTML_INPUT_RADIO from './radio.html'
import HTML_INPUT_RANGE from './range.html'
import HTML_INPUT_SELECT from './select.html'

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
  select: HTML_INPUT_SELECT,
}

const INPUT_TYPE_KEYS = Object.keys(INPUT_TYPE_MAP)

export default class PropInput extends LightningElement {
  /**
   * @type {string | number | boolean}
   */
  @api
  get value() {
    return this._value
  }
  set value(value) {
    this._value = value
  }

  /**
   * @type {string}
   */
  @api label = ''

  /**
   * @type {import('../types').GardenArgType['type']}
   */
  @api type = 'text'

  /**
   * @type {import('../types').GardenArgTypes}
   */
  @api name = 'text'

  /**
   * @type {import('../types').GardenOption}
   */
  @api options = []

  /**
   * when type='(number | range)'
   * @type {number}
   */
  @api min = 0

  /**
   * when type='(number | range)'
   * @type {number}
   */
  @api max = 10

  /**
   * when type='(number | range)'
   * @type {number}
   */
  @api step = 1

  _value

  get optionsToRender() {
    const values = (this.value || '')
      .split(';')
      .filter((item) => item !== undefined && item.length > 0)

    return this.options.map((item) => {
      return {
        ...item,
        checked: values.includes(item.value),
      }
    })
  }

  handleOnInput(event) {
    let value = event.target.value

    if (this.type === 'boolean') {
      value = event.target.checked
    }

    if (this.type === 'number' || this.type === 'range') {
      value = Number(event.target.value)
    }

    if (this.type === 'checkbox' || this.type === 'inline-checkbox') {
      const checkedValue = event.target.value
      let valueArray = this.value
        ? this.value
            .split(';')
            .filter((item) => item !== undefined && item.length > 0)
        : []

      // remove the value if it already exists
      if (valueArray.includes(checkedValue)) {
        valueArray = valueArray.filter((item) => item !== checkedValue)
      } else {
        // add if it doesn't already exist
        valueArray = [...valueArray, checkedValue]
      }

      value = valueArray.join(';')
    }

    this.dispatchEvent(
      new CustomEvent('gardenpropschange', {
        detail: {
          key: this.name,
          value,
        },
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    const { type } = this

    if (INPUT_TYPE_KEYS.includes(type)) {
      return INPUT_TYPE_MAP[type]
    }

    return HTML_INPUT_TEXT
  }
}
