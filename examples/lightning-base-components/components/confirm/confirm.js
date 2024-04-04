import { LightningElement } from 'lwc'
import LightningConfirm from 'lightning/confirm'

export default class Confirm extends LightningElement {
  async handleConfirmClick() {
    const result = await LightningConfirm.open({
      message: 'this is the prompt message',
      variant: 'headerless',
      label: 'this is the aria-label value',
      // setting theme would have no effect
    })
    // Confirm has been closed
    // result is true if OK was clicked
    // and false if cancel was clicked
  }
}
