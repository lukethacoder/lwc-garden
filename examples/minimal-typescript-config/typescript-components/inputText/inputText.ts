import { LightningElement, api } from 'lwc'
import { InputType } from './types'

export * from './types'

export default class InputText extends LightningElement {
  /**
   * Input of the input for the button
   */
  @api value: string = ''

  /**
   * Label of the input for the button
   */
  @api label: string = ''

  @api
  get type() {
    return this._type
  }
  set type(value: InputType | string | undefined) {
    // TODO: normalise here - there is currently no type checking at the HTML template level
    if (
      value === 'text' ||
      value === 'email' ||
      value === 'number' ||
      value === 'tel'
    ) {
      this._type = value
    }
  }

  _type: InputType = 'text'
}
