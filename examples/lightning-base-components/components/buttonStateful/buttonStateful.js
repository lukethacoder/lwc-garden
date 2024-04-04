import { LightningElement } from 'lwc'

export default class ButtonStateful extends LightningElement {
  isSelected = false

  handleClick() {
    this.isSelected = !this.isSelected
  }
}
