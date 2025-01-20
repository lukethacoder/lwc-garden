import { LightningElement, api } from 'lwc'

export default class InputText extends LightningElement {
  /**
   * Input of the input for the button
   */
  @api value: string = ''

  /**
   * Label of the input for the button
   */
  @api label: string = ''
}
