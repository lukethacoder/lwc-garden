import { LightningElement } from 'lwc'

export default class DualListbox extends LightningElement {
  _selected = []

  get options() {
    return [
      { label: 'English', value: 'en' },
      { label: 'German', value: 'de' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'Italian', value: 'it' },
      { label: 'Japanese', value: 'ja' },
    ]
  }

  get selected() {
    return this._selected.length ? this._selected : 'none'
  }

  handleChange(e) {
    this._selected = e.detail.value
  }
}
