import { LightningElement } from 'lwc'
import { InputType } from '../inputText/types'

export default class FormTest extends LightningElement {
  get inputs() {
    return [
      {
        id: '0',
        type: 'text',
        label: 'Input 0',
      },
      {
        id: '1',
        type: 'email',
        label: 'Input 1',
      },
      {
        id: '2',
        type: 'tel',
        label: 'Input 2',
      },
      {
        id: '3',
        type: 'number',
        label: 'Input 3',
      },
    ] as { id: string; label: string; type: InputType }[]
  }
}
