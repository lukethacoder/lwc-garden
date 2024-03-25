const TEST_OPTIONS = [
  {
    label: '0px',
    value: '0px',
  },
  {
    label: '4px',
    value: '4px',
  },
  {
    label: '12px',
    value: '12px',
  },
  {
    label: 'full',
    value: '999px',
  },
]

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
export default {
  name: 'All Arg Types',
  argTypes: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'color',
      type: 'color',
    },
    {
      name: 'boolean',
      type: 'boolean',
    },
    {
      name: 'number',
      type: 'number',
      min: -100,
      max: 100,
      step: 10,
    },
    {
      name: 'range',
      type: 'range',
      min: 5,
      max: 15,
      step: 0.5,
    },
    {
      name: 'select',
      type: 'select',
      options: TEST_OPTIONS,
    },
    {
      name: 'radio',
      type: 'radio',
      options: TEST_OPTIONS,
    },
    {
      name: 'inlineRadio',
      type: 'inline-radio',
      options: TEST_OPTIONS,
    },
    {
      name: 'checkbox',
      type: 'checkbox',
      options: TEST_OPTIONS,
    },
    {
      name: 'inlineCheckbox',
      type: 'inline-checkbox',
      options: TEST_OPTIONS,
    },
  ],
}
