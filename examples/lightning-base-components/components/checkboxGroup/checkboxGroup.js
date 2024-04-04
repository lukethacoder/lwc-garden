import { LightningElement } from 'lwc'

export default class CheckboxGroup extends LightningElement {
  value = ['option1']

  get options() {
    return [
      { label: 'Ross', value: 'option1' },
      { label: 'Rachel', value: 'option2' },
    ]
  }

  get selectedValues() {
    return this.value.join(',')
  }

  handleChange(e) {
    this.value = e.detail.value
  }
}
