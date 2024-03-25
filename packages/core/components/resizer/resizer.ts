import { LightningElement } from 'lwc'

export default class Resizer extends LightningElement {
  dragX

  handleOnMouseDown = (event) => {
    this.dragX = event.clientY
  }

  handleOnMouseMove = (event) => {
    console.log('event.clientY - this.dragX ', event.clientY - this.dragX)
    this.dragX = event.clientY
  }
}
