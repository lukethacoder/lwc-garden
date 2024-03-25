import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'LWC Garden',
      editLink: {
        baseUrl:
          'https://github.com/lukethacoder/lwc-garden/edit/main/packages/web/',
      },
      customCss: [
        // Relative path to your custom CSS file
        './src/style.css',
      ],
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/lukethacoder/lwc-garden',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/getting-started/introduction/' },
            { label: 'Setup', link: '/getting-started/setup/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'ArgTypes',
              link: '/guides/arg-types/',
            },
            {
              label: 'Themes',
              link: '/guides/themes/',
            },
            {
              label: 'Slot Configuration',
              link: '/guides/slot-configuration/',
            },
            {
              label: 'Mocking',
              link: '/guides/mocking/',
            },
            {
              label: 'Advanced Webpack',
              link: '/guides/advanced-webpack/',
              badge: {
                text: 'Coming soon',
                variant: 'caution',
              },
            },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Configuration', link: '/reference/configuration/' },
            {
              label: 'Component Configuration',
              link: '/reference/component-configuration',
            },
          ],
        },
      ],
    }),
  ],
})
