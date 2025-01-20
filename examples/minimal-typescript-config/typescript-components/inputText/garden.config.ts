import { GardenComponentModule, GardenOption } from 'packages/core/types'
import { InputTypeValues } from './types'

const inputTypeValuesMap: GardenOption[] = InputTypeValues.map((item) => ({
  label: item,
  value: item,
}))

export default {
  name: 'Input Text',
  argTypes: [
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'value',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      options: inputTypeValuesMap,
    },
  ],
} satisfies GardenComponentModule
