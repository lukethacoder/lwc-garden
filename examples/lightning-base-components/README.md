# lightning-base-components

This example showcase how you can work with standard `lightning` components.

> NOTE: currently the supported list aligns with the [`lightning-base-components`](https://www.npmjs.com/package/lightning-base-components) package. In the future we may extend support to components outside of the ones listed in the official documentation.

## Mocking

Mocking is done from two different folders:

- `lightning-base-components` NPM module
- local `./__mocks__` folder

A third folder (`./lightning`) allows you to bring your own `lightning-*` components. This is handy for mocking LWCs not supported by [`lightning-base-components`](https://www.npmjs.com/package/lightning-base-components) or other packages.

## Overriding Components

You can bring your own components by using the standard `lwc.config.json` schema:

```json
{
  "modules": [
    {
      "dir": "./.garden/components",
      "namespace": "garden"
    },
    {
      "dir": "./components",
      "namespace": "components"
    },
    {
      "path": "./lightning/button2/button2.js",
      "name": "lightning/button"
    },
    {
      "dirs": [
        "./lightning",
        "./node_modules/lightning-base-components/src/lightning"
      ],
      "namespace": "lightning"
    }
  ]
}
```

The above overrides the default `lightning-button` component with a bespoke one.

> NOTE: the order of your `modules` array is important. Module resolution works its way down the list.

## Available Components

The [`lightning-base-components`](https://www.npmjs.com/package/lightning-base-components) package includes these components, along with any utilities and libraries they require.

- lightning-accordion
- lightning-accordion-section
- LightningAlert
- lightning-avatar
- lightning-badge
- lightning-breadcrumb
- lightning-breadcrumbs
- lightning-button
- lightning-button-group
- lightning-button-icon
- lightning-button-icon-stateful
- lightning-button-menu
- lightning-button-stateful
- lightning-card
- lightning-carousel
- lightning-carousel-image
- lightning-checkbox-group
- lightning-combobox
- LightningConfirm
- lightning-datatable
- lightning-dual-listbox
- lightning-dynamic-icon
- lightning-formatted-address
- lightning-formatted-date-time
- lightning-formatted-email
- lightning-formatted-location
- lightning-formatted-name
- lightning-formatted-number
- lightning-formatted-phone
- lightning-formatted-rich-text
- lightning-formatted-text
- lightning-formatted-time
- lightning-formatted-url
- lightning-helptext
- lightning-icon
- lightning-input
- lightning-input-address
- lightning-input-location
- lightning-input-name
- lightning-layout
- lightning-layout-item
- lightning-menu-divider
- lightning-menu-item
- lightning-menu-subheader
- LightningModal
- lightning-modal-header
- lightning-modal-body
- lightning-modal-footer
- lightning-navigation
- lightning-pill
- lightning-pill-container
- lightning-progress-bar
- lightning-progress-indicator
- lightning-progress-ring
- lightning-progress-step
- LightningPrompt
- lightning-radio-group
- lightning-relative-date-time
- lightning-slider
- lightning-spinner
- lightning-tab
- lightning-tabset
- lightning-textarea
- lightning-tile
- lightning-tree
- lightning-tree-grid
- lightning-vertical-navigation
- lightning-vertical-navigation-item
- lightning-vertical-navigation-item-badge
- lightning-vertical-navigation-item-icon
- lightning-vertical-navigation-overflow
- lightning-vertical-navigation-section

Some components in the npm package are not yet supported for use by customers on the Salesforce platform. For example:

- lightning-context
- lightning-dialog
- lightning-grouped-combobox
- lightning-message-dispatcher
- lightning-picklist
- lightning-popup
- lightning-select
- lightning-stacked-tab
- lightning-stacked-tabset
