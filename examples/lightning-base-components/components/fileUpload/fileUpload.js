import { LightningElement, api } from 'lwc'

export default class FileUpload extends LightningElement {
  @api
  myRecordId

  get acceptedFormats() {
    return ['.pdf', '.png']
  }

  handleUploadFinished(event) {
    // Get the list of uploaded files
    const uploadedFiles = event.detail.files
    alert('No. of files uploaded : ' + uploadedFiles.length)
  }
}
