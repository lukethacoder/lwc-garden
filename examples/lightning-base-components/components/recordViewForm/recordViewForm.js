import { LightningElement, api } from 'lwc'

// import NAME_FIELD from '@salesforce/schema/Contact.Name';

export default class RecordViewForm extends LightningElement {
  // Expose a field to make it available in the template
  // nameField = NAME_FIELD;

  // Flexipage provides recordId and objectApiName
  @api recordId
  @api objectApiName
}
