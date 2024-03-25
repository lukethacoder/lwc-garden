import { LightningElement, api } from 'lwc'

export default class Button extends LightningElement {
  /**
   * Label for the button
   * @type {string}
   */
  @api label = 'Button'

  /**
   * Background color
   * @type {string}
   */
  @api color = '#fff'

  /**
   * Background color
   * @type {string}
   */
  @api backgroundColor = '#22c55e'

  /**
   * Background color
   * @type {string}
   */
  @api borderRadius = '0px'

  get computedStyle() {
    return `
      color: ${this.color || '#fff'};
      background-color: ${this.backgroundColor || '#22c55e'};
      border-radius: ${this.borderRadius || '0px'};
    `
  }
}
