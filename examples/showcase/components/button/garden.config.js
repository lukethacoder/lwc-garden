/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
export default {
  name: 'Button',
  argTypes: [
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'color',
      type: 'color',
    },
    {
      name: 'backgroundColor',
      type: 'color',
    },
    {
      name: 'borderRadius',
      type: 'select',
      options: [
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
      ],
    },
  ],
}
