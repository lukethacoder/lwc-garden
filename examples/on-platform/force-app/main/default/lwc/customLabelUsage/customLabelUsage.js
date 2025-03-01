import { LightningElement } from 'lwc'

import LABEL_SAVE from '@salesforce/label/c.Save'
import LABEL_CANCEL from '@salesforce/label/c.Cancel'

export default class CustomLabelUsage extends LightningElement {
  LABELS = {
    SAVE: LABEL_SAVE,
    CANCEL: LABEL_CANCEL,
  }
}
