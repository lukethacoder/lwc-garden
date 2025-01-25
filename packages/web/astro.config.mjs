import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/utm_campaign=linkedin': '/?utm_campaign=linkedin',
  },
  integrations: [
    starlight({
      title: 'LWC Garden',
      head: [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${process.env.PUBLIC_GA_CODE}`,
          },
        },
        {
          tag: 'script',
          content: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.PUBLIC_GA_CODE}');`,
        },
        {
          tag: 'script',
          attrs: {
            'data-goatcounter': process.env.PUBLIC_GOAT_COUNTER_URL,
            async: true,
            src: '//gc.zgo.at/count.js',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: '/open-graph.jpg',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:image',
            content: '/open-graph.jpg',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:card',
            content: 'summary_large_image',
          },
        },
      ],
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
          label: 'Examples',
          items: [
            {
              label: 'Minimal Configuration',
              link: '/examples/minimal-config/',
            },
            {
              label: 'Custom Theme',
              link: '/examples/custom-theme/',
            },
            {
              label: 'Lightning Base Components',
              link: '/examples/lightning-base-components/',
            },
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
              label: 'Lightning Base Components (SLDS)',
              link: '/guides/lightning-base-components/',
            },
            {
              label: 'Lightning Component Mocking',
              link: '/guides/lightning-component-mocking/',
            },
          ],
        },
        {
          label: '@lwc-garden/utils',
          items: [
            { label: 'Introduction', link: '/packages/utils/' },
            { label: 'Apex Mocking', link: '/packages/apex/' },
            {
              label: 'Static Resource Mocking',
              link: '/packages/staticresources/',
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
            { label: 'FAQs', link: '/reference/faqs/' },
          ],
        },
      ],
    }),
  ],
})
