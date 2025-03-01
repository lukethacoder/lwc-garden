import { LightningElement, wire } from 'lwc'

import apex_getCurrentTime from '@salesforce/apex/ExampleController.getCurrentTime'
import apex_getAccount from '@salesforce/apex/ExampleController.getAccount'

export default class ApexCall extends LightningElement {
  accountId = '001TEST'
  publishStatus = 'Active'

  displayTime
  accountData

  get accountDataDisplay() {
    return JSON.stringify(this.accountData, undefined, 2)
  }

  @wire(apex_getAccount, {
    accountId: '$accountId',
    publishStatus: '$publishStatus',
  })
  wiredGetAccount({ error, data }) {
    if (error) {
      console.error(`Error fetching account with Id ${this.accountId} `, error)
    } else if (data) {
      this.accountData = data

      console.log('this.accountData ', this.accountData)
    }
  }

  async handleGetCurrentTime() {
    const response = await apex_getCurrentTime()
    this.displayTime = response.currentDate
    console.log('this.displayTime ', this.displayTime)
  }
}
