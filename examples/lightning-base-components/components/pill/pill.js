import { LightningElement } from 'lwc'

export default class Pill extends LightningElement {
  infoText

  handleRemove() {
    this.infoText = 'Remove button was clicked'
  }
}
