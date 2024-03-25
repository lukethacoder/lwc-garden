/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
export default {
  name: 'Card',
  argTypes: [
    {
      name: 'backgroundColor',
      type: 'color',
    },
    {
      name: 'backgroundColorAccent',
      type: 'color',
    },
    {
      name: 'isBorderless',
      type: 'boolean',
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
    {
      name: 'variant',
      type: 'radio',
      options: [
        {
          label: 'primary',
          value: 'primary',
        },
        {
          label: 'grid',
          value: 'grid',
        },
        {
          label: 'dotted',
          value: 'dotted',
        },
      ],
    },
  ],
}
