import { LightningElement, api, track } from 'lwc'

export default class Button extends LightningElement {
  /**
   * Label for the button
   * @type {string}
   */
  @api label = 'Button Label'

  /**
   * Background color
   * @type {string}
   */
  @api color = '#fff'

  /**
   * Background color
   * @type {string}
   */
  @api backgroundColor = 'burlywood'

  /**
   * Background color
   * @type {string}
   */
  @api borderRadius = '0px'

  get computedStyle() {
    return `
      color: ${this.color || '#fff'};
      background-color: ${this.backgroundColor || 'burlywood'};
      border-radius: ${this.borderRadius || '0px'};
    `
  }
}
