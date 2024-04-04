import { LightningElement } from 'lwc'

export default class RadioGroup extends LightningElement {
  value = ''

  get options() {
    return [
      { label: 'Sales', value: 'option1' },
      { label: 'Force', value: 'option2' },
    ]
  }
}
