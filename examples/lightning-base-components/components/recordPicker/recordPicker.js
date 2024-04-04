import { LightningElement } from 'lwc'

export default class RecordPicker extends LightningElement {
  filter = {
    criteria: [
      {
        fieldPath: 'Website',
        operator: 'eq',
        value: 'https://www.grenoble.fr',
      },
      {
        fieldPath: 'Website',
        operator: 'eq',
        value: null,
      },
      {
        fieldPath: 'Type',
        operator: 'ne',
        value: 'Partner',
      },
      {
        fieldPath: 'Parent.Name',
        operator: 'like',
        value: 'Acme%',
      },
    ],
    filterLogic: '(1 OR 2) AND NOT(4) AND 3',
  }
}
