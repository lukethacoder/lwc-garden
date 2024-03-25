import { LightningElement, api } from 'lwc'

export default class Badge extends LightningElement {
  /**
   * Label for the badge
   * @type {string}
   */
  @api label = 'Badge'

  /**
   * Badge Variant
   * @type {'default' | 'secondary' | 'outline' | 'destructive'}
   */
  @api variant = 'default'
}
