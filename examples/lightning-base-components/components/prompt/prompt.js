import { LightningElement } from 'lwc'
import LightningPrompt from 'lightning/prompt'

export default class Propt extends LightningElement {
  handlePromptClick() {
    LightningPrompt.open({
      message: 'this is the prompt message',
      //theme defaults to "default"
      label: 'Please Respond', // this is the header text
      defaultValue: 'initial input value', //this is optional
    }).then((result) => {
      // Prompt has been closed
      // result is input text if OK clicked
      // and null if cancel was clicked
    })
  }
}
