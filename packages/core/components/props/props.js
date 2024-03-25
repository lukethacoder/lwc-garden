import { LightningElement, api } from 'lwc'

export default class Props extends LightningElement {
  /**
   * Module metadata (with optional props key)
   * @type {import('../types').GardenModule}
   */
  @api module

  /**
   * Key/value of the properties that have been set for the LWC
   * @type {object}
   */
  @api propValues = {}

  get props() {
    if (!(this.module && Object.hasOwn(this.module, 'argTypes'))) {
      return undefined
    }

    const { module, propValues } = this
    const withPropValues = module.argTypes.reduce((acc, item) => {
      const { name } = item

      acc.push({
        ...item,
        value: Object.hasOwn(propValues, name) ? propValues[name] : null,
      })
      return acc
    }, [])

    return withPropValues
  }

  handleClearValues = () => {
    this.dispatchEvent(
      new CustomEvent('gardenpropsclear', {
        bubbles: true,
        composed: true,
      })
    )
  }
}
