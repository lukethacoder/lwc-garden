import { LightningElement } from 'lwc'

export default class ProgressStep extends LightningElement {
  handleStepBlur(event) {
    const stepIndex = event.detail.index
  }
}
