import { LightningElement } from 'lwc'

export default class ButtonGroup extends LightningElement {
  buttonStatefulState = false
  buttonIconStatefulState = false

  handleButtonStatefulClick() {
    this.buttonStatefulState = !this.buttonStatefulState
  }

  handleButtonIconStatefulClick() {
    this.buttonIconStatefulState = !this.buttonIconStatefulState
  }
}
