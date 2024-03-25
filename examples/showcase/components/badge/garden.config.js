/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
export default {
  name: 'Badge',
  argTypes: [
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'variant',
      type: 'inline-radio',
      options: [
        {
          label: 'default',
          value: 'default',
        },
        {
          label: 'secondary',
          value: 'secondary',
        },
        {
          label: 'outline',
          value: 'outline',
        },
        {
          label: 'destructive',
          value: 'destructive',
        },
      ],
    },
  ],
}
