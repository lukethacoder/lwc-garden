import { LightningElement, wire } from 'lwc'

import formFactor from '@salesforce/client/formFactor'

import apex_getCurrentTime from '@salesforce/apex/ExampleController.getCurrentTime'
import apex_getAccount from '@salesforce/apex/ExampleController.getAccount'

export default class SalesforceImports extends LightningElement {
  responsePayload

  accountId
  responsePayloadWire

  get data() {
    return JSON.stringify(
      {
        formFactor,
        basePath,
        communityId,
        userId,
      },
      undefined,
      2
    )
  }

  @wire(apex_getAccount, {
    accountId: '$accountId',
  })
  wiredGetById({ error, data }) {
    if (error) {
      console.error('Error fetching account ', error, {
        communityId: this.accountId,
      })
      this.responsePayloadWire = JSON.stringify(error, undefined, 2)
    } else if (data) {
      this.responsePayloadWire = JSON.stringify(data, undefined, 2)
    }
  }

  handleOnInput = (event) => {
    this.accountId = event.target.value
  }

  handleGetCurrentTimeFromApex = async () => {
    const response = await apex_getCurrentTime()
    this.responsePayload = JSON.stringify(response, undefined, 2)
  }
}
