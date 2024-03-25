import { LightningElement } from 'lwc'

import formFactor from '@salesforce/client/formFactor'
import basePath from '@salesforce/community/basePath'
import communityId from '@salesforce/community/Id'
import userId from '@salesforce/user/Id'

export default class SalesforceImports extends LightningElement {
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
}
