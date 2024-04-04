import { LightningElement } from 'lwc'

export default class Select extends LightningElement {
  value = ''

  get options() {
    return [
      { label: 'choose one...', value: '' },
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
      { label: 'three', value: '3' },
    ]
  }

  handleChange(event) {
    this.value = event.detail.value
  }
}
