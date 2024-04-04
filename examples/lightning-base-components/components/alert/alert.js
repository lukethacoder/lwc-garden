import { LightningElement } from 'lwc'
import LightningAlert from 'lightning/alert'

export default class Alert extends LightningElement {
  async handleAlertClick() {
    await LightningAlert.open({
      message: 'this is the alert message',
      theme: 'error', // a red theme intended for error states
      label: 'Error!', // this is the header text
    })
  }
}
