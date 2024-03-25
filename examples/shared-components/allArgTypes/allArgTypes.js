import { LightningElement, api } from 'lwc'

export default class Props extends LightningElement {
  @api text
  @api color
  @api boolean
  @api number
  @api select
  @api radio
  @api inlineRadio
  @api checkbox
  @api inlineCheckbox
  @api range

  get inlineStyle() {
    return `border-color: ${this.color || 'black'};`
  }

  get displayProperties() {
    return JSON.stringify(
      {
        text: this.text,
        color: this.color,
        boolean: this.boolean,
        number: this.number,
        select: this.select,
        radio: this.radio,
        inlineRadio: this.inlineRadio,
        checkbox: this.checkbox,
        inlineCheckbox: this.inlineCheckbox,
        range: this.range,
      },
      undefined,
      2
    )
  }
}
