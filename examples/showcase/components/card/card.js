import { LightningElement, api, track } from 'lwc'

export default class Card extends LightningElement {
  /**
   * Background color
   * @type {string}
   */
  @api backgroundColor = 'transparent'

  /**
   * Background color
   * @type {string}
   */
  @api backgroundColorAccent = 'rgb(61 240 82 / 20%)'

  /**
   * Background color
   * @type {string}
   */
  @api borderRadius = '0px'

  /**
   * Background color
   * @type {string}
   */
  @api isBorderless = false

  /**
   * Background color
   * @type {'primary' | 'grid' | 'dotted'}
   */
  @api variant = 'primary'

  get computedStyle() {
    console.log('this.isBorderless ', this.isBorderless)
    return `
      --background-accent-color: ${this.backgroundColorAccent || 'rgb(61 240 82 / 20%)'};
      background-color: ${this.backgroundColor || 'transparent'};
      border-radius: ${this.borderRadius || '0px'};
      ${this.isBorderless !== true ? 'border: 4px solid #22c55e;' : 'border: 4px solid transparent;'}
    `
  }
}
